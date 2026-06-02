import {
  lexicalEditor,
  FixedToolbarFeature,
  TextStateFeature,
  defaultColors,
} from "@payloadcms/richtext-lexical";

/**
 * Shared rich-text editor used across every `richText` field.
 *
 * Starts from Payload's default feature set (bold, italic, underline,
 * strikethrough, headings, alignment, lists, links, blockquote, inline
 * images, horizontal rule, inline toolbar, …) and adds:
 *  - a persistent (fixed) toolbar so all controls are always visible, and
 *  - TextState controls for inline text COLOR, SIZE and FONT.
 *
 * Inline colors use a curated, contrast-safe palette (Payload's defaultColors
 * plus a few brand tones). Per-block / per-section backgrounds use the free
 * hex color fields in `fields/color.ts`.
 */
export const richTextEditor = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    FixedToolbarFeature(),
    TextStateFeature({
      // prettier-ignore
      state: {
        color: {
          ...defaultColors,
          brandBlue: { label: "Brand Blue", css: { color: "#1d4ed8" } },
          neutral: { label: "Neutral", css: { color: "#404040" } },
        },
        size: {
          small: { label: "Small", css: { "font-size": "0.85em" } },
          large: { label: "Large", css: { "font-size": "1.25em" } },
          xlarge: { label: "Extra Large", css: { "font-size": "1.6em" } },
        },
        font: {
          serif: { label: "Serif", css: { "font-family": "Georgia, 'Times New Roman', serif" } },
          mono: { label: "Monospace", css: { "font-family": "ui-monospace, 'SF Mono', monospace" } },
        },
      },
    }),
  ],
});
