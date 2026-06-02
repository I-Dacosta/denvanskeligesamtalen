import type { CSSProperties } from "react";
import clsx from "clsx";

export type BlockStyle = {
  backgroundColor?: string | null;
  textColor?: string | null;
  paddingY?: "none" | "sm" | "md" | "lg" | "xl" | null;
  align?: "left" | "center" | "right" | null;
  maxWidth?: "narrow" | "normal" | "wide" | "full" | null;
};

const PADDING: Record<NonNullable<BlockStyle["paddingY"]>, string> = {
  none: "",
  sm: "py-6",
  md: "py-12",
  lg: "py-20",
  xl: "py-32",
};

const ALIGN: Record<NonNullable<BlockStyle["align"]>, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const WIDTH: Record<NonNullable<BlockStyle["maxWidth"]>, string> = {
  narrow: "max-w-2xl",
  normal: "max-w-4xl",
  wide: "max-w-6xl",
  full: "max-w-none",
};

/** Outer section: handles full-bleed background color + vertical spacing. */
export function sectionProps(style?: BlockStyle | null): {
  className: string;
  style: CSSProperties;
} {
  return {
    className: clsx("w-full", PADDING[style?.paddingY ?? "md"]),
    style: style?.backgroundColor
      ? { backgroundColor: style.backgroundColor }
      : {},
  };
}

/** Inner container: handles content width, alignment and text color. */
export function containerProps(style?: BlockStyle | null): {
  className: string;
  style: CSSProperties;
} {
  return {
    className: clsx(
      "mx-auto px-6",
      WIDTH[style?.maxWidth ?? "normal"],
      ALIGN[style?.align ?? "left"]
    ),
    style: style?.textColor ? { color: style.textColor } : {},
  };
}
