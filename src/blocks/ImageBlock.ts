import type { Block } from "payload";
import { blockStyle } from "../fields/blockStyle";

export const ImageBlock: Block = {
  slug: "image",
  interfaceName: "ImageBlock",
  labels: { singular: "Image", plural: "Images" },
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Image",
    },
    {
      name: "caption",
      type: "text",
      label: "Caption",
    },
    {
      name: "size",
      type: "select",
      label: "Image width",
      defaultValue: "normal",
      options: [
        { label: "Small", value: "small" },
        { label: "Normal", value: "normal" },
        { label: "Wide", value: "wide" },
        { label: "Full bleed", value: "full" },
      ],
    },
    {
      name: "rounded",
      type: "checkbox",
      label: "Rounded corners",
      defaultValue: false,
    },
    blockStyle,
  ],
};
