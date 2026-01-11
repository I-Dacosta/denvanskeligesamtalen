import { getPayload } from "payload";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables FIRST, before importing config
dotenv.config({ path: path.join(process.cwd(), ".env") });

async function seed() {
  console.log("Starting seed process...");
  console.log("PAYLOAD_SECRET:", process.env.PAYLOAD_SECRET ? "✓ Set" : "✗ Not set");
  console.log("DATABASE_URL:", process.env.DATABASE_URL ? "✓ Set" : "✗ Not set");

  // Dynamically import config after env vars are loaded
  const configModule = await import("../src/payload.config.js");
  const payload = await getPayload({ config: configModule.default });

  try {
    // Clear existing data
    console.log("Clearing existing data...");
    await payload.delete({ collection: "homepage", where: {} });
    await payload.delete({ collection: "navigation", where: {} });
    await payload.delete({ collection: "story-chapters", where: {} });

    // Seed Homepage
    console.log("Seeding Homepage...");
    await payload.create({
      collection: "homepage",
      data: {
        hero: {
          subtitle: "Unni Gjertsen & Runa Carlsen",
          mainTitle: "DEN\nVANSKELIGE\nSAMTALEN",
          description: "En kunstnerisk utforskning av dialogens potensiale.",
          imageCredit: "Foto: Marte Aas",
        },
        navigationItems: [
          { number: "01", label: "Om Prosjektet" },
          { number: "02", label: "Podkast" },
          { number: "03", label: "Performance" },
          { number: "04", label: "Teater" },
        ],
        sponsor: {
          heading: "Støttet av",
          name: "Fritt Ord",
          subtitle: "Stiftelsen",
        },
      },
    });
    console.log("✅ Homepage seeded");

    // Seed Navigation
    console.log("Seeding Navigation...");
    await payload.create({
      collection: "navigation",
      data: {
        about: {
          sectionLabel: "Om Prosjektet",
          heading: "Den vanskelige samtalen",
          subtitle: "Podkast – work in progress",
          description: {
            root: {
              type: "root",
              children: [
                {
                  type: "paragraph",
                  children: [
                    {
                      type: "text",
                      text: "«Den vanskelige samtalen» er et kunstnerisk prosjekt som springer ut av en dyp kommunikasjonskrise mellom to venner og kollegaer, Unni Gjertsen og Runa Carlsen.",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  children: [
                    {
                      type: "text",
                      text: "Med utgangspunkt i ulike bakgrunner og perspektiver på den israelsk-palestinske konflikten utforsker de, med hjelp fra Nansen Fredssenter, dialog som et verktøy for å unngå stillhet og ghosting.",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  children: [
                    {
                      type: "text",
                      text: "Kjernen i prosjektet er syv podkastepisoder, hver med mål om å fremme åpne, ærlige og utfordrende samtaler. Uten press om å oppnå enighet går dialogene i dybden på temaer som identitet, traumer, polarisering og kritisk tenkning.",
                    },
                  ],
                },
              ],
            },
          },
          partnersHeading: "Samarbeidspartnere",
          partnersText:
            "Astrid Folkedal Kraidy (Nansen Fredssenter), Stephan Lyngved (Flink Pike Podcast Production), performance kunstnere Hanna Filomen Mjåvatn og Mariko Miyata.",
        },
        artists: [
          {
            name: "Unni Gjertsen",
            role: "Billedkunstner, filmskaper og forfatter",
            bio: {
              root: {
                type: "root",
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        type: "text",
                        text: "Unni Gjertsen (f. 1966, Norge) er en billedkunstner, filmskaper og forfatter basert i Oslo. Hennes tverrfaglige praksis utforsker hvordan vi oppfatter geografi og historie, ofte ved å bruke økologiske og feministiske perspektiver. Hun bruker film, performance, tekst og installasjon til å utforske hvordan narrativer om sted og historie blir konstruert og erfart.",
                      },
                    ],
                  },
                ],
              },
            },
            website: "https://unnigjertsen.com",
          },
          {
            name: "Runa Carlsen",
            role: "Billedkunstner",
            bio: {
              root: {
                type: "root",
                children: [
                  {
                    type: "paragraph",
                    children: [
                      {
                        type: "text",
                        text: "Jeg undersøker hvordan sosiale og historiske strukturer former fellesskap, solidaritet og identitet. Over tid har jeg arbeidet med hvordan tekstil som materiale er tett knyttet til samfunnets økonomiske og økologiske systemer – fra antropocen til kolonialisme og kapitalisme.",
                      },
                    ],
                  },
                  {
                    type: "paragraph",
                    children: [
                      {
                        type: "text",
                        text: "Jeg arbeider på tvers av medier, hovedsakelig med tekstil, performance og video, og bruker dokumentariske, stedssensitive og relasjonelle strategier. Samarbeid med andre kunstnere og fagpersoner er en sentral del av min praksis. Jeg ønsker at arbeidene mine skal åpne for refleksjon, handling – og i siste instans, endring.",
                      },
                    ],
                  },
                ],
              },
            },
            website: "https://www.runacarlsen.no/",
          },
        ],
      },
    });
    console.log("✅ Navigation seeded");

    // Seed Story Chapters
    console.log("Seeding Story Chapters...");
    const chapters = [
      {
        order: 1,
        subtitle: "Bakgrunn",
        titleLine1: "Den Vanskelige",
        titleLine2: "Samtalen",
        text: "Et kunstnerisk prosjekt som springer ut av en dyp kommunikasjonskrise mellom to venner og kolleger, Unni Gjertsen og Runa Carlsen.",
        highlight: "dyp kommunikasjonskrise",
        weight: 1.1,
      },
      {
        order: 2,
        subtitle: "Podkast",
        titleLine1: "Å unngå",
        titleLine2: "stillhet",
        text: "Med ulike bakgrunner og perspektiver på Israel-Palestina-konflikten, og med hjelp fra Nansen Fredssenter, utforsker de dialog som et verktøy for å unngå stillhet og 'ghosting'.",
        highlight: "unngå stillhet",
        weight: 0.8,
      },
      {
        order: 3,
        subtitle: "Performance",
        titleLine1: "Åtte",
        titleLine2: "Episoder",
        text: "Sentralt i prosjektet er åtte podkastepisoder, hver utformet for å fremme åpne, ærlige og utfordrende samtaler. Uten press om å oppnå enighet, dykker dialogene ned i temaer som identitet, traumer, polarisering og kritisk tenkning.",
        highlight: "utfordrende samtaler",
        weight: 0.6,
      },
    ];

    for (const chapter of chapters) {
      await payload.create({
        collection: "story-chapters",
        data: chapter,
      });
    }
    console.log("✅ Story Chapters seeded");

    console.log("\n🎉 Seed completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

seed();
