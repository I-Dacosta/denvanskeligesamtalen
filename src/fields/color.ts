import type { Field, TextField } from "payload";

const HEX_PATTERN = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

/**
 * A free-form hex color field (any color). Renders as a normal text input in
 * the admin and validates the value as a hex code (e.g. #1d4ed8 or #fff).
 *
 * We use a validated text field rather than a custom color-picker component so
 * the admin panel needs no custom import-map entries — keeping the admin
 * robust and deploy-safe.
 */
export const colorField = (
  name: string,
  label: string,
  overrides: Partial<TextField> = {}
): Field => ({
  name,
  type: "text",
  label,
  admin: {
    placeholder: "#1d4ed8",
    description: "Pick a color, or leave blank for the default.",
    ...overrides.admin,
    components: {
      Field: "/components/admin/ColorPickerField#ColorPickerField",
      ...overrides.admin?.components,
    },
  },
  validate: (value: unknown) => {
    if (!value) return true;
    if (typeof value === "string" && HEX_PATTERN.test(value.trim())) return true;
    return "Enter a valid hex color, e.g. #1d4ed8 or #fff.";
  },
  ...overrides,
});
