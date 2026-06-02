import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { slugify } from "@/lib/slugify";

export type ChapterNavItem = {
  subtitle: string;
};

/**
 * Horizontal chapter navigation shown on each chapter page. Lists every
 * chapter by its subtitle and links to its own page, highlighting the active
 * one.
 */
export function ChapterNav({
  chapters,
  activeSlug,
}: {
  chapters: ChapterNavItem[];
  activeSlug?: string;
}) {
  if (!chapters || chapters.length === 0) return null;

  return (
    <nav className="w-full px-6 pt-24 md:pt-28">
      <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-lg md:text-2xl font-light">
        {chapters.map((c) => {
          const slug = slugify(c.subtitle);
          const isActive = slug === activeSlug;
          return (
            <li key={slug}>
              <Link
                href={`/kapittel/${slug}`}
                className={clsx(
                  "transition-colors",
                  isActive
                    ? "text-neutral-900"
                    : "text-neutral-400 hover:text-neutral-900"
                )}
              >
                {c.subtitle}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
