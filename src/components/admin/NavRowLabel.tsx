"use client";

import React from "react";
import { useRowLabel } from "@payloadcms/ui";

/**
 * Array row label that shows the item's actual number + label
 * (e.g. "02 — Podkast") instead of the generic "Navigation Item 01".
 */
export const NavRowLabel: React.FC = () => {
  const { data } = useRowLabel<{ number?: string; label?: string }>();
  const text = [data?.number, data?.label].filter(Boolean).join(" — ");
  return <span>{text || "Navigation Item"}</span>;
};
