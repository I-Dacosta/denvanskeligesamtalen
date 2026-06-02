import type { CollectionConfig } from "payload";

import { slugField } from "../fields/slug";
import { colorField } from "../fields/color";
import { RichTextBlock } from "../blocks/RichTextBlock";
import { ImageBlock } from "../blocks/ImageBlock";
import { HeroBlock } from "../blocks/HeroBlock";
import { TwoColumnBlock } from "../blocks/TwoColumnBlock";
import { SpacerBlock } from "../blocks/SpacerBlock";
import { ButtonBlock } from "../blocks/ButtonBlock";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "published", "updatedAt"],
    description: "Create and design standalone pages with the block builder.",
  },
  access: {
    // Only published pages are exposed to the public site.
    read: ({ req }) => {
      if (req.user) return true;
      return { published: { equals: true } };
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    slugField("title"),
    {
      name: "published",
      type: "checkbox",
      label: "Published",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Unpublished pages are only visible to logged-in editors.",
      },
    },
    colorField("pageBackground", "Page background color", {
      admin: { position: "sidebar" },
    }),
    {
      name: "layout",
      type: "blocks",
      label: "Page layout",
      labels: { singular: "Block", plural: "Blocks" },
      blocks: [
        HeroBlock,
        RichTextBlock,
        ImageBlock,
        TwoColumnBlock,
        ButtonBlock,
        SpacerBlock,
      ],
    },
    {
      name: "meta",
      type: "group",
      label: "SEO",
      admin: { position: "sidebar" },
      fields: [
        { name: "title", type: "text", label: "Meta title" },
        { name: "description", type: "textarea", label: "Meta description" },
      ],
    },
  ],
};
