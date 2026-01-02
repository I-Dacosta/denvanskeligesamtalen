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
};

const chapters: Chapter[] = [
  {
    id: "chapter-1",
    subtitle: "Bakgrunn",
    titleLines: ["Den Vanskelige", "Samtalen"],
    text: "Et kunstnerisk prosjekt som springer ut av en dyp kommunikasjonskrise mellom to venner og kolleger, Unni Gjertsen og Runa Carlsen.",
    highlight: "dyp kommunikasjonskrise",
  },
  {
    id: "chapter-2",
    subtitle: "Dialog",
    titleLines: ["Å unngå", "stillhet"],
    text: "Med ulike bakgrunner og perspektiver på Israel-Palestina-konflikten, og med hjelp fra Nansen Fredssenter, utforsker de dialog som et verktøy for å unngå stillhet og 'ghosting'.",
    highlight: "unngå stillhet",
  },
  {
    id: "chapter-3",
    subtitle: "Podkast",
    titleLines: ["Syv", "Episoder"],
    text: "Sentralt i prosjektet er syv podkastepisoder, hver utformet for å fremme åpne, ærlige og utfordrende samtaler. Uten press om å oppnå enighet, dykker dialogene ned i temaer som identitet, traumer, polarisering og kritisk tenkning.",
    highlight: "utfordrende samtaler",
  },
];

const CHAPTER_WEIGHTS = [1.1, 0.8, 0.6];
const TOTAL_WEIGHT = CHAPTER_WEIGHTS.reduce((a, b) => a + b, 0);

const CHAPTER_RANGES = CHAPTER_WEIGHTS.reduce((acc, weight, i) => {
  const start = i === 0 ? 0 : acc[i - 1][1];
  const end = start + weight / TOTAL_WEIGHT;
  acc.push([start, end]);
  return acc;
}, [] as [number, number][]);

function useChapterT(
  scrollYProgress: MotionValue<number>,
  index: number
) {
  const [start, end] = CHAPTER_RANGES[index];
  const duration = end - start;
  const isLast = index === CHAPTER_RANGES.length - 1;

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

function FixedTextLayer({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 h-full w-full z-20">
      <div className="flex h-full w-full items-center justify-center px-6">
        <div className="w-full max-w-2xl text-center">
          {chapters.map((c, i) => {
            const { t, opacity } = useChapterT(
              scrollYProgress,
              i
            );

            const defaultY = useTransform(t, [0, 0.5, 1], ["14px", "0px", "-14px"], {
              clamp: true,
            });

            const firstY = useTransform(t, [0, 0.85], ["-35vh", "0vh"], {
              clamp: true,
            });

            const y = i === 0 ? firstY : defaultY;

            return (
              <motion.div
                key={c.id}
                className="absolute left-1/2 top-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2"
                style={{ opacity, y }}
              >
                <div className="mb-6 overflow-clip font-mono text-xs uppercase tracking-[0.28em] text-neutral-500">
                  <MaskedLine t={t}>{c.subtitle}</MaskedLine>
                </div>

                <h2
                  className="font-medium tracking-tight text-neutral-900"
                  style={{
                    fontSize: "clamp(28px, 3.4vw, 52px)",
                    lineHeight: 1.02,
                  }}
                >
                  {c.titleLines.map((line, idx) => (
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
                    {renderHighlightText(c.text, c.highlight)}
                  </MaskedLine>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function renderHighlightText(text: string, highlight: string) {
  const parts = text.split(highlight);
  if (parts.length === 1) return text;

  return (
    <>
      {parts.map((p, idx) => (
        <React.Fragment key={idx}>
          {p}
          {idx < parts.length - 1 && (
            <span className="text-blue-600 font-medium">{highlight}</span>
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


function ScrollListScaffold() {
  return (
    <ul
      className="relative flex flex-col gap-0 pb-32 pt-16 lg:pb-24 lg:pt-24"
    >
      {chapters.map((c, i) => (
        <li
          key={c.id}
          className={`relative ${
            i === chapters.length - 1 ? "min-h-[50vh] lg:min-h-[60vh]" : "min-h-[80vh] lg:min-h-[100vh]"
          }`}
        >
        </li>
      ))}
    </ul>
  );
}

export function ScrollStory() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  return (
    <section className="relative w-full bg-white text-neutral-950">
        <div className="relative mx-auto max-w-[100vw]">
          <div ref={containerRef} className="relative">
            {/* Sticky container for the "fixed" layers */}
            <div className="sticky top-0 h-screen overflow-hidden">
               <div className="pointer-events-none absolute inset-0">
                 <FixedTextLayer scrollYProgress={scrollYProgress} />
               </div>
               <div className="pointer-events-auto absolute inset-0">
                 <PlayButtonLayer scrollYProgress={scrollYProgress} />
               </div>
            </div>

            {/* Scroll-driver scaffold (ul/li) */}
            <div className="-mt-[100vh]">
               <ScrollListScaffold />
            </div>
          </div>
          
          {/* Collaborators Section */}
          <div className="sticky top-0 h-screen bg-white flex flex-col justify-center items-center px-6 text-center">
            <h3 className="text-neutral-500 uppercase tracking-widest text-sm mb-8">Samarbeidspartnere</h3>
            <div className="flex flex-wrap justify-center gap-8 text-neutral-800 max-w-4xl mx-auto">
              <p>Astrid Folkedal Kraidy (Nansen Fredssenter)</p>
              <p>Stephan Lyngved (Flink Pike Podcast Production)</p>
              <p>Hanna Filomen Mjåvatn</p>
              <p>Mariko Miyata</p>
            </div>
            <div className="mt-16 text-neutral-400 text-sm">
              <p>Foto: Marte Aas, Hilde Malme</p>
            </div>
          </div>
          
          {/* Spacer to allow last section to be visible */}
          <div className="h-screen"></div>
        </div>
    </section>
  );
}
