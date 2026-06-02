import type { Block } from "payload";
import { blockStyle } from "../fields/blockStyle";

export const HeroBlock: Block = {
  slug: "hero",
  interfaceName: "HeroBlock",
  labels: { singular: "Hero", plural: "Heroes" },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      label: "Eyebrow (small text above heading)",
    },
    {
      name: "heading",
      type: "text",
      label: "Heading",
      required: true,
    },
    {
      name: "subtext",
      type: "richText",
      label: "Subtext",
    },
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      label: "Background image",
    },
    {
      name: "minHeight",
      type: "select",
      label: "Height",
      defaultValue: "medium",
      options: [
        { label: "Compact", value: "compact" },
        { label: "Medium", value: "medium" },
        { label: "Full screen", value: "full" },
      ],
    },
    blockStyle,
  ],
};
