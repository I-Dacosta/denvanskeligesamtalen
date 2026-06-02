import { getPayload } from "payload";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables FIRST, before importing config.
dotenv.config({ path: path.join(process.cwd(), ".env") });

/**
 * Sets the homepage Sponsor Section to show both funders side by side:
 * Fritt Ord and Kulturrådet. Uses stable static assets from /public/images
 * (served by Next on any port/domain) via the `logoUrl` field, so it does not
 * depend on the CMS media-upload pipeline. Both rows remain editable in admin.
 */
async function fixSponsors() {
  console.log("Fixing sponsor section...");

  const configModule = await import("../src/payload.config.js");
  const payload = await getPayload({ config: configModule.default });

  try {
    const existing = await payload.find({ collection: "homepage", limit: 1 });
    const homepage = existing.docs[0];

    if (!homepage) {
      console.error("❌ No homepage document found. Run `pnpm seed` first.");
      process.exit(1);
    }

    const sponsor =
      (homepage as { sponsor?: Record<string, unknown> }).sponsor || {};

    await payload.update({
      collection: "homepage",
      id: homepage.id,
      data: {
        sponsor: {
          ...sponsor,
          heading: (sponsor.heading as string) || "Støttet av",
          items: [
            {
              logoUrl: "/images/fritt-ord.png",
              name: "Fritt Ord",
              url: "https://frittord.no",
            },
            {
              logoUrl: "/images/kulturradet.png",
              name: "Kulturrådet",
              url: "https://www.kulturradet.no",
            },
          ],
        },
      },
    });

    console.log("✅ Sponsor section now shows Fritt Ord + Kulturrådet.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error fixing sponsors:", error);
    process.exit(1);
  }
}

fixSponsors();
