import type { Field } from "payload";

const toSlug = (value: string): string =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip accents
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * URL slug field. Auto-derives from `fromField` (default "title") when left
 * blank, and always normalizes whatever is entered into a safe slug.
 */
export const slugField = (fromField = "title"): Field => ({
  name: "slug",
  type: "text",
  index: true,
  unique: true,
  admin: {
    position: "sidebar",
    description: "URL path for this page, e.g. 'about' → /about. Auto-filled from the title.",
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        const source =
          (typeof value === "string" && value.trim()) ||
          (data?.[fromField] as string | undefined) ||
          "";
        return source ? toSlug(source) : value;
      },
    ],
  },
});
