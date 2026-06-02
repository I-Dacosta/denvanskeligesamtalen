import React from "react";
import { RichText as LexicalRichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

type RichTextValue = SerializedEditorState | string | string[] | null | undefined;

/**
 * Renders Payload Lexical content (including inline color / size / font set via
 * the editor's TextState controls, links and inline images). Also tolerates the
 * legacy fallback shapes (plain string / array of paragraphs) used in some
 * default content so existing components keep working.
 */
export function RichText({
  data,
  className,
}: {
  data: RichTextValue;
  className?: string;
}) {
  if (!data) return null;

  if (Array.isArray(data)) {
    return (
      <div className={className}>
        {data.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    );
  }

  if (typeof data === "string") {
    return <div className={className}>{data}</div>;
  }

  if (!("root" in data) || !data.root) return null;

  return <LexicalRichText data={data} className={className} />;
}
