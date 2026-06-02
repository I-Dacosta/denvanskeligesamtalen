import type { Block } from "payload";
import { colorField } from "../fields/color";

export const ButtonBlock: Block = {
  slug: "button",
  interfaceName: "ButtonBlock",
  labels: { singular: "Button", plural: "Buttons" },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "label",
          type: "text",
          label: "Button text",
          required: true,
        },
        {
          name: "url",
          type: "text",
          label: "Link URL",
          required: true,
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "variant",
          type: "select",
          label: "Style",
          defaultValue: "solid",
          options: [
            { label: "Solid", value: "solid" },
            { label: "Outline", value: "outline" },
            { label: "Text link", value: "link" },
          ],
        },
        {
          name: "align",
          type: "select",
          label: "Alignment",
          defaultValue: "left",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },
      ],
    },
    {
      type: "row",
      fields: [
        colorField("backgroundColor", "Button color"),
        colorField("textColor", "Text color"),
      ],
    },
    {
      name: "newTab",
      type: "checkbox",
      label: "Open in new tab",
      defaultValue: false,
    },
  ],
};
