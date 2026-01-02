import { ScrollStory } from "@/components/ScrollStory";
import { HeroSliced } from "@/components/HeroSliced";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      {/* Uncomment the Hero you want to use */}
      <HeroSliced />

      <ScrollStory />
    </main>
  );
}
