import type { Block } from "payload";
import { blockStyle } from "../fields/blockStyle";

export const TwoColumnBlock: Block = {
  slug: "twoColumn",
  interfaceName: "TwoColumnBlock",
  labels: { singular: "Two Columns", plural: "Two Columns" },
  fields: [
    {
      name: "left",
      type: "richText",
      label: "Left column",
      required: true,
    },
    {
      name: "right",
      type: "richText",
      label: "Right column",
      required: true,
    },
    {
      name: "reverseOnMobile",
      type: "checkbox",
      label: "Show right column first on mobile",
      defaultValue: false,
    },
    blockStyle,
  ],
};
