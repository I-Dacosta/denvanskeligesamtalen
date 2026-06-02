/*
 * One-off, NON-DESTRUCTIVE data migration.
 *
 * Run locally:   node scripts/db-migrate.cjs
 *
 * It connects to the database in .env (DATABASE_URL) and:
 *   1. Renumbers homepage navigation items to 01, 02, 03 … (by position).
 *   2. Moves a legacy single sponsor logo into the new sponsor.items array
 *      (only if items is empty) so it stays visible in the admin + site.
 *   3. Fills in the Navigation Content rich text (about description + artist
 *      bios + partner text) ONLY where it is currently empty.
 *
 * It never deletes anything and is safe to run more than once.
 */
const fs = require("fs");
const path = require("path");

const mongodb = require(path.join(
  __dirname,
  "..",
  "node_modules/.pnpm/mongodb@6.16.0/node_modules/mongodb"
));
const { MongoClient, ObjectId } = mongodb;

function getDbUrl() {
  const env = fs.readFileSync(path.join(__dirname, "..", ".env"), "utf8");
  const line = env.split("\n").find((l) => l.startsWith("DATABASE_URL="));
  if (!line) throw new Error("DATABASE_URL not found in .env");
  return line.slice("DATABASE_URL=".length).trim();
}

/** Build a valid Payload/Lexical rich-text value from plain paragraphs. */
function lexical(paragraphs) {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children: paragraphs.map((text) => ({
        type: "paragraph",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        textFormat: 0,
        textStyle: "",
        children: [
          {
            type: "text",
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text,
            version: 1,
          },
        ],
      })),
    },
  };
}

/** True when a rich-text field has no real text content. */
function isEmptyRichText(v) {
  if (!v) return true;
  if (Array.isArray(v)) return v.length === 0;
  const children = v.root && v.root.children;
  if (!Array.isArray(children) || children.length === 0) return true;
  const text = JSON.stringify(children).replace(/[^a-zA-ZæøåÆØÅ0-9]/g, "");
  return text.length === 0;
}

const CONTENT = {
  aboutDescription: [
    "«Den vanskelige samtalen» er et kunstnerisk prosjekt som springer ut av en dyp kommunikasjonskrise mellom to venner og kollegaer, Unni Gjertsen og Runa Carlsen.",
    "Med utgangspunkt i ulike bakgrunner og perspektiver på den israelsk-palestinske konflikten utforsker de, med hjelp fra Nansen Fredssenter, dialog som et verktøy for å unngå stillhet og ghosting.",
    "Kjernen i prosjektet er syv podkastepisoder, hver med mål om å fremme åpne, ærlige og utfordrende samtaler. Uten press om å oppnå enighet går dialogene i dybden på temaer som identitet, traumer, polarisering og kritisk tenkning.",
  ],
  partnersText:
    "Astrid Folkedal Kraidy (Nansen Fredssenter), Stephan Lyngved (Flink Pike Podcast Production), performance kunstnere Hanna Filomen Mjåvatn og Mariko Miyata.",
  bios: {
    "Unni Gjertsen": [
      "Unni Gjertsen (f. 1966, Norge) er en billedkunstner, filmskaper og forfatter basert i Oslo. Hennes tverrfaglige praksis utforsker hvordan vi oppfatter geografi og historie, ofte ved å bruke økologiske og feministiske perspektiver. Hun bruker film, performance, tekst og installasjon til å utforske hvordan narrativer om sted og historie blir konstruert og erfart.",
    ],
    "Runa Carlsen": [
      "Jeg undersøker hvordan sosiale og historiske strukturer former fellesskap, solidaritet og identitet. Over tid har jeg arbeidet med hvordan tekstil som materiale er tett knyttet til samfunnets økonomiske og økologiske systemer – fra antropocen til kolonialisme og kapitalisme.",
      "Jeg arbeider på tvers av medier, hovedsakelig med tekstil, performance og video, og bruker dokumentariske, stedssensitive og relasjonelle strategier. Samarbeid med andre kunstnere og fagpersoner er en sentral del av min praksis. Jeg ønsker at arbeidene mine skal åpne for refleksjon, handling – og i siste instans, endring.",
    ],
  },
};

(async () => {
  const client = new MongoClient(getDbUrl());
  await client.connect();
  const db = client.db();
  const changes = [];

  // ---- 1 & 2: Homepage ----
  const homepage = await db.collection("homepage").findOne({});
  if (homepage) {
    const update = {};

    if (Array.isArray(homepage.navigationItems)) {
      const renumbered = homepage.navigationItems.map((item, i) => ({
        ...item,
        number: String(i + 1).padStart(2, "0"),
      }));
      if (JSON.stringify(renumbered) !== JSON.stringify(homepage.navigationItems)) {
        update.navigationItems = renumbered;
        changes.push(
          `nav numbers -> ${renumbered.map((n) => n.number).join(", ")}`
        );
      }
    }

    const sponsor = homepage.sponsor || {};
    const hasItems = Array.isArray(sponsor.items) && sponsor.items.length > 0;
    if (!hasItems && sponsor.logo) {
      update.sponsor = {
        ...sponsor,
        items: [
          {
            id: new ObjectId().toString(),
            logo: sponsor.logo,
            name: sponsor.name || "",
            url: "",
          },
        ],
      };
      changes.push("moved legacy sponsor logo into sponsor.items[0]");
    }

    if (Object.keys(update).length > 0) {
      await db.collection("homepage").updateOne({ _id: homepage._id }, { $set: update });
    }
  }

  // ---- 3: Navigation Content ----
  const navigation = await db.collection("navigation").findOne({});
  if (navigation) {
    const update = {};
    const about = navigation.about || {};

    if (isEmptyRichText(about.description)) {
      update["about.description"] = lexical(CONTENT.aboutDescription);
      changes.push("filled about.description");
    }
    if (!about.partnersText) {
      update["about.partnersText"] = CONTENT.partnersText;
      changes.push("filled about.partnersText");
    }
    if (!about.sectionLabel) update["about.sectionLabel"] = "Om Prosjektet";
    if (!about.heading) update["about.heading"] = "Den vanskelige samtalen";
    if (!about.subtitle) update["about.subtitle"] = "Podkast – work in progress";
    if (!about.partnersHeading) update["about.partnersHeading"] = "Samarbeidspartnere";

    if (Array.isArray(navigation.artists)) {
      const artists = navigation.artists.map((a) => {
        if (CONTENT.bios[a.name] && isEmptyRichText(a.bio)) {
          changes.push(`filled bio for ${a.name}`);
          return { ...a, bio: lexical(CONTENT.bios[a.name]) };
        }
        return a;
      });
      if (JSON.stringify(artists) !== JSON.stringify(navigation.artists)) {
        update.artists = artists;
      }
    }

    if (Object.keys(update).length > 0) {
      await db.collection("navigation").updateOne({ _id: navigation._id }, { $set: update });
    }
  }

  console.log(
    changes.length
      ? "Applied changes:\n - " + changes.join("\n - ")
      : "No changes needed (data already up to date)."
  );

  await client.close();
})().catch((e) => {
  console.error("Migration failed:", e.message);
  process.exit(1);
});
