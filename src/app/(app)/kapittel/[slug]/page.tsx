import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";

import { Navbar } from "@/components/Navbar";
import { ChapterNav } from "@/components/ChapterNav";
import { ChapterArticle, type Chapter } from "@/components/ChapterArticle";
import { slugify } from "@/lib/slugify";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    const payload = await getPayload({ config });
    const [chapters, navigation, pages] = await Promise.all([
      payload.find({ collection: "story-chapters", sort: "order", limit: 100 }),
      payload.find({ collection: "navigation", limit: 1 }),
      payload.find({
        collection: "pages",
        where: { published: { equals: true } },
        sort: "title",
        limit: 50,
      }),
    ]);
    return {
      chapters: chapters.docs as unknown as (Chapter & { order: number })[],
      navigation: navigation.docs[0] || null,
      pages: pages.docs.map((p: { title: string; slug: string }) => ({
        title: p.title,
        slug: p.slug,
      })),
    };
  } catch (error) {
    console.error("Error fetching chapter data:", error);
    return { chapters: [], navigation: null, pages: [] };
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { chapters } = await getData();
  const chapter = chapters.find((c) => slugify(c.subtitle) === slug);
  if (!chapter) return {};
  return {
    title: `${chapter.titleLine1} ${chapter.titleLine2 ?? ""}`.trim(),
    description: chapter.text,
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { chapters, navigation, pages } = await getData();
  const chapter = chapters.find((c) => slugify(c.subtitle) === slug);

  if (!chapter) notFound();

  return (
    <main className="flex min-h-screen flex-col bg-white text-neutral-950">
      <Navbar data={navigation as never} pages={pages} />
      <ChapterNav chapters={chapters} activeSlug={slug} />
      <ChapterArticle chapter={chapter} />
    </main>
  );
}
