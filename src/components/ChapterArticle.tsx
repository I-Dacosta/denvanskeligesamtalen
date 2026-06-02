import { PlayButton } from "@/components/PlayButton";

export type Chapter = {
  subtitle?: string;
  titleLine1: string;
  titleLine2?: string;
  text: string;
  textColor?: string;
  showPlayButton?: boolean;
  podcastUrl?: string;
};

export function ChapterArticle({ chapter }: { chapter: Chapter }) {
  return (
    <section className="flex flex-1 items-center justify-center px-6 py-20">
      <div
        className="w-full max-w-2xl text-center"
        style={chapter.textColor ? { color: chapter.textColor } : undefined}
      >
        {chapter.subtitle ? (
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.28em] text-neutral-500">
            {chapter.subtitle}
          </p>
        ) : null}
        <h1
          className="font-medium tracking-tight text-neutral-900"
          style={{ fontSize: "clamp(32px, 5vw, 64px)", lineHeight: 1.02 }}
        >
          {chapter.titleLine1}
          {chapter.titleLine2 ? (
            <>
              <br />
              {chapter.titleLine2}
            </>
          ) : null}
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-neutral-700 md:text-lg">
          {chapter.text}
        </p>
        {chapter.showPlayButton ? (
          <PlayButton audioUrl={chapter.podcastUrl} />
        ) : null}
      </div>
    </section>
  );
}
