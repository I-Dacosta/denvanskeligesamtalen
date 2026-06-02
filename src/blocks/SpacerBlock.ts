import type { Block } from "payload";

export const SpacerBlock: Block = {
  slug: "spacer",
  interfaceName: "SpacerBlock",
  labels: { singular: "Spacer", plural: "Spacers" },
  fields: [
    {
      name: "height",
      type: "select",
      label: "Height",
      defaultValue: "md",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
        { label: "Extra large", value: "xl" },
      ],
    },
    {
      name: "divider",
      type: "checkbox",
      label: "Show divider line",
      defaultValue: false,
    },
  ],
};
