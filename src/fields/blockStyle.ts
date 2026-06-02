import type { Field } from "payload";
import { colorField } from "./color";

/**
 * Reusable "Styling" group attached to every page-builder block. Gives editors
 * free control over background/text color plus spacing, alignment and width.
 */
export const blockStyle: Field = {
  name: "style",
  type: "group",
  label: "Styling",
  admin: {
    description: "Optional colors, spacing, alignment and width for this block.",
  },
  fields: [
    {
      type: "row",
      fields: [
        colorField("backgroundColor", "Background color"),
        colorField("textColor", "Text color"),
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "paddingY",
          type: "select",
          label: "Vertical spacing",
          defaultValue: "md",
          options: [
            { label: "None", value: "none" },
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
            { label: "Extra large", value: "xl" },
          ],
        },
        {
          name: "align",
          type: "select",
          label: "Text alignment",
          defaultValue: "left",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },
        {
          name: "maxWidth",
          type: "select",
          label: "Content width",
          defaultValue: "normal",
          options: [
            { label: "Narrow", value: "narrow" },
            { label: "Normal", value: "normal" },
            { label: "Wide", value: "wide" },
            { label: "Full width", value: "full" },
          ],
        },
      ],
    },
  ],
};
