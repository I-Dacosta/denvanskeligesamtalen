import type { Block } from "payload";
import { blockStyle } from "../fields/blockStyle";

export const RichTextBlock: Block = {
  slug: "richText",
  interfaceName: "RichTextBlock",
  labels: { singular: "Rich Text", plural: "Rich Text" },
  fields: [
    {
      name: "content",
      type: "richText",
      label: "Content",
      required: true,
    },
    blockStyle,
  ],
};
