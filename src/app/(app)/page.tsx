import { HeroSliced } from "@/components/HeroSliced";
import { Navbar } from "@/components/Navbar";
import { slugify } from "@/lib/slugify";
import { getPayload } from "payload";
import config from "@payload-config";

// Always render on-demand so Payload CMS edits show up immediately
// instead of being frozen into a static build on Vercel.
export const dynamic = "force-dynamic";

export default async function Home() {
  let homepage = null;
  let navigation = null;
  let chapterLinks: Array<{ label: string; slug: string }> = [];
  let pages: Array<{ title: string; slug: string }> = [];

  try {
    const payload = await getPayload({ config });

    // Fetch Homepage data
    const homepageData = await payload.find({
      collection: "homepage",
      limit: 1,
    });

    // Fetch Navigation data
    const navigationData = await payload.find({
      collection: "navigation",
      limit: 1,
    });

    // Fetch Story Chapters
    const storyChaptersData = await payload.find({
      collection: "story-chapters",
      sort: "order",
    });

    // Fetch published Pages for the menu
    const pagesData = await payload.find({
      collection: "pages",
      where: { published: { equals: true } },
      sort: "title",
      limit: 50,
    });

    homepage = homepageData.docs[0] || null;
    navigation = navigationData.docs[0] || null;
    chapterLinks = (storyChaptersData.docs || []).map(
      (c: { subtitle: string }) => ({
        label: c.subtitle,
        slug: slugify(c.subtitle),
      })
    );
    pages = pagesData.docs.map((p: { title: string; slug: string }) => ({
      title: p.title,
      slug: p.slug,
    }));
  } catch (error) {
    console.error("Error fetching Payload data:", error);
    // Components will use fallback data
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <Navbar data={navigation} pages={pages} />
      <HeroSliced data={homepage} chapterLinks={chapterLinks} />
    </main>
  );
}
