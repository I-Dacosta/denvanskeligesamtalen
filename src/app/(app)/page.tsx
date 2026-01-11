import { ScrollStory } from "@/components/ScrollStory";
import { HeroSliced } from "@/components/HeroSliced";
import { Navbar } from "@/components/Navbar";
import { getPayload } from "payload";
import config from "@payload-config";

export default async function Home() {
  let homepage = null;
  let navigation = null;
  let chapters = null;

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

    homepage = homepageData.docs[0] || null;
    navigation = navigationData.docs[0] || null;
    chapters = storyChaptersData.docs || null;
  } catch (error) {
    console.error("Error fetching Payload data:", error);
    // Components will use fallback data
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <Navbar data={navigation} />
      <HeroSliced data={homepage} />
      <ScrollStory data={chapters} />
    </main>
  );
}
