import { ScrollStory } from "@/components/ScrollStory";
import { Hero } from "@/components/Hero";
import { HeroManheimer } from "@/components/HeroManheimer";
import { HeroSliced } from "@/components/HeroSliced";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-neutral-950">
      {/* Uncomment the Hero you want to use */}
      <HeroSliced />

      <ScrollStory />
    </main>
  );
}
