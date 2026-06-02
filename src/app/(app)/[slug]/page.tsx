import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";

import { Navbar } from "@/components/Navbar";
import { RenderBlocks } from "@/components/blocks/RenderBlocks";

export const dynamic = "force-dynamic";

async function getPage(slug: string) {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "pages",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    });
    return result.docs[0] || null;
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

async function getNavigation() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({ collection: "navigation", limit: 1 });
    return result.docs[0] || null;
  } catch {
    return null;
  }
}

async function getPages(): Promise<Array<{ title: string; slug: string }>> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "pages",
      where: { published: { equals: true } },
      sort: "title",
      limit: 50,
    });
    return result.docs.map((p: { title: string; slug: string }) => ({
      title: p.title,
      slug: p.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return {};
  const meta = (page as { meta?: { title?: string; description?: string } }).meta;
  return {
    title: meta?.title || (page as { title?: string }).title,
    description: meta?.description,
  };
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [page, navigation, pages] = await Promise.all([
    getPage(slug),
    getNavigation(),
    getPages(),
  ]);

  if (!page) notFound();

  const bg = (page as { pageBackground?: string }).pageBackground;
  const layout = (page as { layout?: never[] }).layout;

  return (
    <main
      className="flex min-h-screen flex-col bg-white text-neutral-950"
      style={bg ? { backgroundColor: bg } : undefined}
    >
      <Navbar data={navigation as never} pages={pages} />
      <RenderBlocks blocks={layout} />
    </main>
  );
}
