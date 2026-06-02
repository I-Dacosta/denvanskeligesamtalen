import React from "react";
import clsx from "clsx";
import { RichText } from "../RichText";
import { sectionProps, containerProps, type BlockStyle } from "./blockStyle";

type Media = { url?: string; alt?: string; width?: number; height?: number };

type Block = {
  blockType: string;
  id?: string;
  [key: string]: unknown;
};

const IMAGE_WIDTH: Record<string, string> = {
  small: "max-w-md",
  normal: "max-w-3xl",
  wide: "max-w-5xl",
  full: "max-w-none",
};

const HERO_HEIGHT: Record<string, string> = {
  compact: "min-h-[40vh]",
  medium: "min-h-[60vh]",
  full: "min-h-screen",
};

const SPACER_HEIGHT: Record<string, string> = {
  sm: "h-8",
  md: "h-16",
  lg: "h-28",
  xl: "h-48",
};

const BTN_ALIGN: Record<string, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

function HeroView({ block }: { block: Block }) {
  const bg = block.backgroundImage as Media | undefined;
  const section = sectionProps(block.style as BlockStyle);
  const container = containerProps(block.style as BlockStyle);
  return (
    <section
      className={clsx(
        "relative flex items-center",
        HERO_HEIGHT[(block.minHeight as string) ?? "medium"],
        section.className
      )}
      style={section.style}
    >
      {bg?.url && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bg.url}
            alt={bg.alt || ""}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </>
      )}
      <div className={clsx("relative", container.className)} style={container.style}>
        {block.eyebrow ? (
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] opacity-70">
            {block.eyebrow as string}
          </p>
        ) : null}
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          {block.heading as string}
        </h1>
        {block.subtext ? (
          <div className="rich-text mt-6 text-lg font-light">
            <RichText data={block.subtext as never} />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function RichTextView({ block }: { block: Block }) {
  const section = sectionProps(block.style as BlockStyle);
  const container = containerProps(block.style as BlockStyle);
  return (
    <section className={section.className} style={section.style}>
      <div className={container.className} style={container.style}>
        <div className="rich-text">
          <RichText data={block.content as never} />
        </div>
      </div>
    </section>
  );
}

function ImageView({ block }: { block: Block }) {
  const img = block.image as Media | undefined;
  if (!img?.url) return null;
  const section = sectionProps(block.style as BlockStyle);
  const container = containerProps(block.style as BlockStyle);
  return (
    <section className={section.className} style={section.style}>
      <figure
        className={clsx(
          "mx-auto px-6",
          IMAGE_WIDTH[(block.size as string) ?? "normal"],
          container.className.includes("text-center") && "text-center"
        )}
        style={container.style}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.url}
          alt={img.alt || (block.caption as string) || ""}
          className={clsx(
            "h-auto w-full",
            block.rounded ? "rounded-2xl" : "rounded-none"
          )}
        />
        {block.caption ? (
          <figcaption className="mt-3 text-sm text-neutral-500">
            {block.caption as string}
          </figcaption>
        ) : null}
      </figure>
    </section>
  );
}

function TwoColumnView({ block }: { block: Block }) {
  const section = sectionProps(block.style as BlockStyle);
  const container = containerProps(block.style as BlockStyle);
  return (
    <section className={section.className} style={section.style}>
      <div
        className={clsx(
          container.className,
          "grid grid-cols-1 gap-10 md:grid-cols-2"
        )}
        style={container.style}
      >
        <div
          className={clsx("rich-text", block.reverseOnMobile && "order-2 md:order-1")}
        >
          <RichText data={block.left as never} />
        </div>
        <div
          className={clsx("rich-text", block.reverseOnMobile && "order-1 md:order-2")}
        >
          <RichText data={block.right as never} />
        </div>
      </div>
    </section>
  );
}

function ButtonView({ block }: { block: Block }) {
  const variant = (block.variant as string) ?? "solid";
  const bg = (block.backgroundColor as string) || "#171717";
  const fg = (block.textColor as string) || "#ffffff";

  const style: React.CSSProperties =
    variant === "solid"
      ? { backgroundColor: bg, color: fg }
      : variant === "outline"
        ? { borderColor: bg, color: bg, borderWidth: 1 }
        : { color: bg };

  return (
    <section className="w-full py-6">
      <div
        className={clsx("mx-auto flex max-w-4xl px-6", BTN_ALIGN[(block.align as string) ?? "left"])}
      >
        <a
          href={block.url as string}
          target={block.newTab ? "_blank" : undefined}
          rel={block.newTab ? "noopener noreferrer" : undefined}
          className={clsx(
            "inline-flex items-center rounded-full text-sm font-medium transition-opacity hover:opacity-80",
            variant === "link" ? "underline underline-offset-4" : "px-6 py-3"
          )}
          style={style}
        >
          {block.label as string}
        </a>
      </div>
    </section>
  );
}

function SpacerView({ block }: { block: Block }) {
  return (
    <div className="mx-auto max-w-4xl px-6">
      <div className={SPACER_HEIGHT[(block.height as string) ?? "md"]} />
      {block.divider ? <hr className="border-neutral-200" /> : null}
    </div>
  );
}

export function RenderBlocks({ blocks }: { blocks?: Block[] | null }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, index) => {
        const key = block.id || `${block.blockType}-${index}`;
        switch (block.blockType) {
          case "hero":
            return <HeroView key={key} block={block} />;
          case "richText":
            return <RichTextView key={key} block={block} />;
          case "image":
            return <ImageView key={key} block={block} />;
          case "twoColumn":
            return <TwoColumnView key={key} block={block} />;
          case "button":
            return <ButtonView key={key} block={block} />;
          case "spacer":
            return <SpacerView key={key} block={block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
