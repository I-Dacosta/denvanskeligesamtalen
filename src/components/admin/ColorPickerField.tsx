"use client";

import React from "react";
import { useField } from "@payloadcms/ui";

type Props = {
  path: string;
  field?: {
    label?: string;
    required?: boolean;
    admin?: { description?: string };
  };
};

const isHex6 = (v: string) => /^#[0-9a-fA-F]{6}$/.test(v);

/**
 * Custom admin field: a visual color picker (native swatch) paired with a hex
 * text input and a clear button. Writes a hex string into a normal text field.
 */
export const ColorPickerField: React.FC<Props> = ({ path, field }) => {
  const { value, setValue, showError, errorMessage } = useField<string>({ path });
  const current = typeof value === "string" ? value : "";
  const label = field?.label || "Color";
  const description = field?.admin?.description;

  const inputStyle: React.CSSProperties = {
    height: 40,
    padding: "0 10px",
    border: "1px solid var(--theme-elevation-150)",
    borderRadius: 4,
    background: "var(--theme-input-bg)",
    color: "var(--theme-elevation-800)",
  };

  return (
    <div className="field-type text">
      <label className="field-label">
        {label}
        {field?.required ? <span className="required">*</span> : null}
      </label>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type="color"
          aria-label={`${label} swatch`}
          value={isHex6(current) ? current : "#171717"}
          onChange={(e) => setValue(e.target.value)}
          style={{
            width: 48,
            height: 40,
            padding: 2,
            border: "1px solid var(--theme-elevation-150)",
            borderRadius: 4,
            cursor: "pointer",
            background: "var(--theme-input-bg)",
          }}
        />
        <input
          type="text"
          value={current}
          placeholder="#1d4ed8"
          spellCheck={false}
          onChange={(e) => setValue(e.target.value)}
          style={{ ...inputStyle, flex: 1 }}
        />
        {current ? (
          <button
            type="button"
            onClick={() => setValue("")}
            style={{ ...inputStyle, cursor: "pointer", background: "transparent" }}
          >
            Clear
          </button>
        ) : null}
      </div>

      {description ? (
        <div style={{ marginTop: 4, fontSize: 12, opacity: 0.7 }}>{description}</div>
      ) : null}
      {showError && errorMessage ? (
        <div style={{ marginTop: 4, fontSize: 12, color: "var(--theme-error-500)" }}>
          {errorMessage}
        </div>
      ) : null}
    </div>
  );
};
