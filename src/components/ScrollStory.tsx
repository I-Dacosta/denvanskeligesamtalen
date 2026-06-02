"use client";

import * as React from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import clsx from "clsx";

type Chapter = {
  id: string;
  subtitle: string;
  titleLines: string[];
  text: string;
  highlight: string;
  highlightColor?: string;
  textColor?: string;
};

type ChapterData = {
  order: number;
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  text: string;
  highlight: string;
  weight: number;
  highlightColor?: string;
  textColor?: string;
};

const defaultChapters: Chapter[] = [
  {
    id: "chapter-1",
    subtitle: "Bakgrunn",
    titleLines: ["Den Vanskelige", "Samtalen"],
    text: "Et kunstnerisk prosjekt som springer ut av en dyp kommunikasjonskrise mellom to venner og kolleger, Unni Gjertsen og Runa Carlsen.",
    highlight: "dyp kommunikasjonskrise",
  },
  {
    id: "chapter-2",
    subtitle: "Podkast",
    titleLines: ["Å unngå", "stillhet"],
    text: "Med ulike bakgrunner og perspektiver på Israel-Palestina-konflikten, og med hjelp fra Nansen Fredssenter, utforsker de dialog som et verktøy for å unngå stillhet og 'ghosting'.",
    highlight: "unngå stillhet",
  },
  {
    id: "chapter-3",
    subtitle: "Performance",
    titleLines: ["Åtte", "Episoder"],
    text: "Sentralt i prosjektet er åtte podkastepisoder, hver utformet for å fremme åpne, ærlige og utfordrende samtaler. Uten press om å oppnå enighet, dykker dialogene ned i temaer som identitet, traumer, polarisering og kritisk tenkning.",
    highlight: "utfordrende samtaler",
  },
];

function useChapterT(
  scrollYProgress: MotionValue<number>,
  index: number,
  chapterRanges: [number, number][]
) {
  const [start, end] = chapterRanges[index];
  const duration = end - start;
  const isLast = index === chapterRanges.length - 1;

  const t = useTransform(scrollYProgress, [start, end], [0, 1], {
    clamp: true,
  });

  let opacityInput: number[];
  let opacityOutput: number[];

  if (index === 0) {
    opacityInput = [-1, 0, end - 0.05 * duration, end];
    opacityOutput = [1, 1, 1, 0];
  } else if (isLast) {
    opacityInput = [start, start + 0.10 * duration];
    opacityOutput = [0, 1];
  } else {
    opacityInput = [start, start + 0.10 * duration, end - 0.10 * duration, end];
    opacityOutput = [0, 1, 1, 0];
  }

  const opacity = useTransform(
    scrollYProgress,
    opacityInput,
    opacityOutput,
    { clamp: true }
  );

  return { t, opacity, start, end };
}

function MaskedLine({
  children,
  t,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  t: MotionValue<number>;
  delay?: number;
  className?: string;
}) {
  const inStart = 0 + delay;
  const inEnd = 0.25 + delay;

  const y = useTransform(t, [inStart, inEnd], ["100%", "0%"], {
    clamp: true,
  });

  return (
    <span className={clsx("relative block overflow-clip", className)}>
      <span className="relative block overflow-clip">
        <motion.span
          className="relative block will-change-transform"
          style={{ y }}
        >
          {children}
        </motion.span>
      </span>
    </span>
  );
}

function ChapterText({
  chapter,
  index,
  scrollYProgress,
  chapterRanges,
}: {
  chapter: Chapter;
  index: number;
  scrollYProgress: MotionValue<number>;
  chapterRanges: [number, number][];
}) {
  const { t, opacity } = useChapterT(scrollYProgress, index, chapterRanges);

  const defaultY = useTransform(t, [0, 0.5, 1], ["14px", "0px", "-14px"], {
    clamp: true,
  });

  const firstY = useTransform(t, [0, 0.85], ["-35vh", "0vh"], {
    clamp: true,
  });

  const y = index === 0 ? firstY : defaultY;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2"
      style={{ opacity, y, color: chapter.textColor || undefined }}
    >
      <div className="mb-6 overflow-clip font-mono text-xs uppercase tracking-[0.28em] text-neutral-500">
        <MaskedLine t={t}>{chapter.subtitle}</MaskedLine>
      </div>

      <h2
        className="font-medium tracking-tight text-neutral-900"
        style={{
          fontSize: "clamp(28px, 3.4vw, 52px)",
          lineHeight: 1.02,
        }}
      >
        {chapter.titleLines.map((line, idx) => (
          <MaskedLine
            key={idx}
            t={t}
            delay={idx * 0.05}
            className="text-balance"
          >
            {line}
          </MaskedLine>
        ))}
      </h2>

      <div className="mx-auto mt-6 max-w-xl overflow-clip text-sm leading-relaxed text-neutral-700 md:text-base">
        <MaskedLine t={t} delay={0.08} className="text-balance">
          {renderHighlightText(chapter.text, chapter.highlight, chapter.highlightColor)}
        </MaskedLine>
      </div>
    </motion.div>
  );
}

function FixedTextLayer({
  scrollYProgress,
  chapters,
  chapterRanges,
}: {
  scrollYProgress: MotionValue<number>;
  chapters: Chapter[];
  chapterRanges: [number, number][];
}) {
  return (
    <div className="pointer-events-none absolute inset-0 h-full w-full z-20">
      <div className="flex h-full w-full items-center justify-center px-6">
        <div className="w-full max-w-2xl text-center">
          {chapters.map((c, i) => (
            <ChapterText
              key={c.id}
              chapter={c}
              index={i}
              scrollYProgress={scrollYProgress}
              chapterRanges={chapterRanges}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function renderHighlightText(
  text: string,
  highlight: string,
  highlightColor?: string
) {
  const parts = text.split(highlight);
  if (parts.length === 1) return text;

  return (
    <>
      {parts.map((p, idx) => (
        <React.Fragment key={idx}>
          {p}
          {idx < parts.length - 1 && (
            <span
              className="font-medium"
              style={{ color: highlightColor || "#2563eb" }}
            >
              {highlight}
            </span>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

function PlayButtonLayer({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <div className="pointer-events-auto absolute inset-0 h-full w-full z-30 flex items-end justify-center pb-24 lg:pb-32">
       <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="inline-flex items-center gap-4 group hover:scale-105 transition-transform duration-300"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-neutral-900/20 flex items-center justify-center group-hover:border-neutral-900/40 transition-colors bg-white/20 backdrop-blur-sm">
            {isPlaying ? (
               <svg 
               className="w-6 h-6 md:w-8 md:h-8 text-neutral-900" 
               fill="currentColor" 
               viewBox="0 0 24 24"
             >
               <rect x="6" y="4" width="4" height="16" />
               <rect x="14" y="4" width="4" height="16" />
             </svg>
            ) : (
              <svg 
                className="w-6 h-6 md:w-8 md:h-8 text-neutral-900 ml-1" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </div>
          <span className="text-lg md:text-xl font-light text-neutral-900">
            {isPlaying ? "Pause podkast" : "Hør på podkasten"}
          </span>
        </button>
    </div>
  );
}


function ScrollListScaffold({ chapters }: { chapters: Chapter[] }) {
  return (
    <ul
      className="relative flex flex-col gap-0 pb-32 pt-16 lg:pb-24 lg:pt-24"
    >
      {chapters.map((c, i) => (
        <li
          key={c.id}
          id={c.id}
          className={`relative scroll-mt-0 ${
            i === chapters.length - 1 ? "min-h-[50vh] lg:min-h-[60vh]" : "min-h-[80vh] lg:min-h-[100vh]"
          }`}
        >
        </li>
      ))}
    </ul>
  );
}

export function ScrollStory({ data }: { data?: ChapterData[] }) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Convert ChapterData to Chapter format and compute weights
  const chapters: Chapter[] = React.useMemo(() => {
    const sourceData = data || defaultChapters.map((ch, idx) => ({
      order: idx + 1,
      subtitle: ch.subtitle,
      titleLine1: ch.titleLines[0],
      titleLine2: ch.titleLines[1],
      text: ch.text,
      highlight: ch.highlight,
      weight: idx === 0 ? 1.1 : idx === 1 ? 0.8 : 0.6,
    }));

    return sourceData
      .sort((a, b) => a.order - b.order)
      .map((ch) => ({
        id: `chapter-${ch.order}`,
        subtitle: ch.subtitle,
        titleLines: [ch.titleLine1, ch.titleLine2],
        text: ch.text,
        highlight: ch.highlight,
        highlightColor: ch.highlightColor,
        textColor: ch.textColor,
      }));
  }, [data]);

  const CHAPTER_WEIGHTS = React.useMemo(() => {
    const sourceData = data || defaultChapters.map((_, idx) => ({
      order: idx + 1,
      subtitle: '',
      titleLine1: '',
      titleLine2: '',
      text: '',
      highlight: '',
      weight: idx === 0 ? 1.1 : idx === 1 ? 0.8 : 0.6,
    }));
    return sourceData.map(ch => ch.weight);
  }, [data]);

  const TOTAL_WEIGHT = CHAPTER_WEIGHTS.reduce((a, b) => a + b, 0);

  const CHAPTER_RANGES = CHAPTER_WEIGHTS.reduce((acc, weight, i) => {
    const start = i === 0 ? 0 : acc[i - 1][1];
    const end = start + weight / TOTAL_WEIGHT;
    acc.push([start, end]);
    return acc;
  }, [] as [number, number][]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Keep the latest ranges available to the (stable) scroll handler.
  const rangesRef = React.useRef(CHAPTER_RANGES);
  rangesRef.current = CHAPTER_RANGES;

  // Buttons elsewhere on the page ask us to scroll a given chapter to the
  // centre of the screen. Because the visible text is positioned by weighted
  // scroll-progress ranges (not by the scaffold's <li> heights), we translate
  // the target chapter's range into an exact scroll offset instead of using
  // scrollIntoView, which would overshoot.
  React.useEffect(() => {
    const handler = (event: Event) => {
      const index = (event as CustomEvent<number>).detail;
      const container = containerRef.current;
      const ranges = rangesRef.current;
      if (!container || typeof index !== "number" || !ranges[index]) return;

      const [start, end] = ranges[index];
      // t where the chapter text sits vertically centred (y === 0):
      // the first chapter settles at t≈0.85, the rest at their midpoint.
      const centerT = index === 0 ? 0.85 : 0.5;
      const progress = start + centerT * (end - start);

      const rect = container.getBoundingClientRect();
      const containerTop = rect.top + window.scrollY;
      const top =
        containerTop - window.innerHeight + progress * container.offsetHeight;

      window.scrollTo({ top, behavior: "smooth" });
    };

    window.addEventListener("dvs:scroll-to-chapter", handler);
    return () => window.removeEventListener("dvs:scroll-to-chapter", handler);
  }, []);

  return (
    <section className="relative w-full bg-white text-neutral-950">
        <div className="relative mx-auto max-w-[100vw]">
          <div ref={containerRef} className="relative">
            {/* Sticky container for the "fixed" layers */}
            <div className="sticky top-0 h-screen overflow-hidden">
               <div className="pointer-events-none absolute inset-0">
                 <FixedTextLayer scrollYProgress={scrollYProgress} chapters={chapters} chapterRanges={CHAPTER_RANGES} />
               </div>
               <div className="pointer-events-auto absolute inset-0">
                 <PlayButtonLayer scrollYProgress={scrollYProgress} />
               </div>
            </div>

            {/* Scroll-driver scaffold (ul/li) */}
            <div className="-mt-[100vh]">
               <ScrollListScaffold chapters={chapters} />
            </div>
          </div>
          
          {/* Collaborators Section */}
          <div className="sticky top-0 h-screen bg-white flex flex-col justify-center items-center px-6 text-center">
            <h3 className="text-neutral-500 uppercase tracking-widest text-sm mb-8">Samarbeidspartnere</h3>
            <div className="flex flex-wrap justify-center gap-8 text-neutral-800 max-w-4xl mx-auto">
              <p>Co Producent: ProductionSelskapet Konsept AS</p>
              <p>Nansen Fredssenter Lillehammer</p>
            </div>
          </div>
          
          {/* Spacer to allow last section to be visible */}
          <div className="h-screen"></div>
        </div>
    </section>
  );
}
