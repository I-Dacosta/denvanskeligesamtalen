import type { Field, TextField } from "payload";

const HEX_PATTERN = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

/**
 * A free-form hex color field rendered with a visual color picker (native
 * swatch + hex input). Validates the value as a hex code (e.g. #1d4ed8 or #fff).
 *
 * NOTE: `admin` is assembled LAST from `overrides.admin` so the picker
 * component is never clobbered by a caller passing its own `admin` options
 * (e.g. a description or sidebar position). Non-admin overrides are spread
 * before, so they can still be customized.
 */
export const colorField = (
  name: string,
  label: string,
  overrides: Partial<TextField> = {}
): Field => {
  const { admin: adminOverrides, ...rest } = overrides;

  return {
    name,
    type: "text",
    label,
    validate: (value: unknown) => {
      if (!value) return true;
      if (typeof value === "string" && HEX_PATTERN.test(value.trim())) return true;
      return "Enter a valid hex color, e.g. #1d4ed8 or #fff.";
    },
    ...rest,
    admin: {
      placeholder: "#1d4ed8",
      description: "Pick a color, or leave blank for the default.",
      ...adminOverrides,
      components: {
        Field: "/components/admin/ColorPickerField#ColorPickerField",
        ...adminOverrides?.components,
      },
    },
  };
};
