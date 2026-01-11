import React from "react";

type LexicalNode = {
  type: string;
  children?: LexicalNode[];
  text?: string;
  [key: string]: any;
};

type LexicalContent = {
  root: {
    type: string;
    children: LexicalNode[];
  };
};

export function renderRichText(content: LexicalContent | string | string[]): React.ReactNode {
  // Handle array of strings (fallback format)
  if (Array.isArray(content)) {
    return content.map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));
  }

  // Handle plain string
  if (typeof content === "string") {
    return <p>{content}</p>;
  }

  // Handle Lexical format
  if (content?.root?.children) {
    return renderLexicalNodes(content.root.children);
  }

  return null;
}

function renderLexicalNodes(nodes: LexicalNode[]): React.ReactNode {
  return nodes.map((node, index) => {
    switch (node.type) {
      case "paragraph":
        return (
          <p key={index}>
            {node.children ? renderLexicalNodes(node.children) : null}
          </p>
        );

      case "heading":
        const HeadingTag = `h${node.tag || 2}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag key={index}>
            {node.children ? renderLexicalNodes(node.children) : null}
          </HeadingTag>
        );

      case "text":
        let text: React.ReactNode = node.text;

        if (node.format) {
          if (node.format & 1) text = <strong>{text}</strong>; // Bold
          if (node.format & 2) text = <em>{text}</em>; // Italic
          if (node.format & 8) text = <code>{text}</code>; // Code
        }

        return <React.Fragment key={index}>{text}</React.Fragment>;

      case "link":
        return (
          <a
            key={index}
            href={node.url}
            target={node.newTab ? "_blank" : undefined}
            rel={node.newTab ? "noopener noreferrer" : undefined}
          >
            {node.children ? renderLexicalNodes(node.children) : null}
          </a>
        );

      case "list":
        const ListTag = node.listType === "number" ? "ol" : "ul";
        return (
          <ListTag key={index}>
            {node.children ? renderLexicalNodes(node.children) : null}
          </ListTag>
        );

      case "listitem":
        return (
          <li key={index}>
            {node.children ? renderLexicalNodes(node.children) : null}
          </li>
        );

      default:
        // For unknown types, try to render children
        if (node.children) {
          return (
            <React.Fragment key={index}>
              {renderLexicalNodes(node.children)}
            </React.Fragment>
          );
        }
        return null;
    }
  });
}
