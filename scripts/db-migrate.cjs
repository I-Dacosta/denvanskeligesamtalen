/*
 * One-off, NON-DESTRUCTIVE data migration.  Run locally:
 *
 *   node scripts/db-migrate.cjs
 *
 * Connects to the database in .env (DATABASE_URL) and:
 *   1. Renumbers homepage navigation items to 01, 02, 03 … (by position).
 *   2. Moves a legacy single sponsor logo into the new sponsor.items array
 *      (only if a logo upload exists and items is empty).
 *   3. Normalizes Navigation Content rich text (about description + artist
 *      bios) into valid Lexical so the admin editor can display/edit it.
 *      The text content is preserved; only the node shape is repaired.
 *
 * Collections in Mongo are pluralized by Payload's mongoose adapter
 * (homepage -> homepages, navigation -> navigations).
 *
 * Never deletes anything and is safe to run more than once.
 */
const fs = require("fs");
const path = require("path");

const { MongoClient, ObjectId } = require(path.join(
  __dirname,
  "..",
  "node_modules/.pnpm/mongodb@6.16.0/node_modules/mongodb"
));

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
          { type: "text", detail: 0, format: 0, mode: "normal", style: "", text, version: 1 },
        ],
      })),
    },
  };
}

/** Pull plain paragraph strings out of any (even malformed) rich-text value. */
function extractParagraphs(rt) {
  if (!rt || !rt.root || !Array.isArray(rt.root.children)) return [];
  return rt.root.children
    .map((node) =>
      (Array.isArray(node.children) ? node.children : [])
        .map((k) => (typeof k.text === "string" ? k.text : ""))
        .join("")
    )
    .filter((s) => s.trim().length > 0);
}

/** A rich-text value is malformed if its nodes lack Lexical's `version`. */
function needsNormalize(rt) {
  if (!rt || !rt.root) return false;
  if (rt.root.version === undefined) return true;
  return (rt.root.children || []).some((n) => n.version === undefined);
}

(async () => {
  const client = new MongoClient(getDbUrl());
  await client.connect();
  const db = client.db();
  const changes = [];

  // ---- 1 & 2: Homepage ----
  const homepages = db.collection("homepages");
  const homepage = await homepages.findOne({});
  if (homepage) {
    const update = {};

    if (Array.isArray(homepage.navigationItems)) {
      const renumbered = homepage.navigationItems.map((item, i) => ({
        ...item,
        number: String(i + 1).padStart(2, "0"),
      }));
      if (JSON.stringify(renumbered) !== JSON.stringify(homepage.navigationItems)) {
        update.navigationItems = renumbered;
        changes.push(`nav numbers -> ${renumbered.map((n) => n.number).join(", ")}`);
      }
    }

    const sponsor = homepage.sponsor || {};
    const hasItems = Array.isArray(sponsor.items) && sponsor.items.length > 0;
    if (!hasItems && sponsor.logo) {
      update.sponsor = {
        ...sponsor,
        items: [
          { id: new ObjectId().toString(), logo: sponsor.logo, name: sponsor.name || "", url: "" },
        ],
      };
      changes.push("moved legacy sponsor logo into sponsor.items[0]");
    }

    if (Object.keys(update).length > 0) {
      await homepages.updateOne({ _id: homepage._id }, { $set: update });
    }
  }

  // ---- 3: Navigation Content (repair rich text shape) ----
  const navigations = db.collection("navigations");
  const navigation = await navigations.findOne({});
  if (navigation) {
    const update = {};

    if (needsNormalize(navigation?.about?.description)) {
      const paras = extractParagraphs(navigation.about.description);
      if (paras.length > 0) {
        update["about.description"] = lexical(paras);
        changes.push("normalized about.description rich text");
      }
    }

    if (Array.isArray(navigation.artists)) {
      let touched = false;
      const artists = navigation.artists.map((a) => {
        if (needsNormalize(a.bio)) {
          const paras = extractParagraphs(a.bio);
          if (paras.length > 0) {
            touched = true;
            changes.push(`normalized bio for ${a.name}`);
            return { ...a, bio: lexical(paras) };
          }
        }
        return a;
      });
      if (touched) update.artists = artists;
    }

    if (Object.keys(update).length > 0) {
      await navigations.updateOne({ _id: navigation._id }, { $set: update });
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
