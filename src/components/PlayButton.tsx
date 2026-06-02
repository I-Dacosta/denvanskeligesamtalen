"use client";

import React from "react";

/**
 * Podcast play button, restored from the original scroll-story design.
 *
 * When `audioUrl` is provided the button plays/pauses real audio; otherwise it
 * is a purely visual toggle (swapping the play/pause icon and label), matching
 * the original behaviour before chapters became standalone pages.
 */
export function PlayButton({ audioUrl }: { audioUrl?: string }) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        void audio.play();
      }
    }
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="mt-12 flex justify-center">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Pause podkast" : "Hør på podkasten"}
        className="inline-flex items-center gap-4 group hover:scale-105 transition-transform duration-300"
      >
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-neutral-900/20 flex items-center justify-center group-hover:border-neutral-900/40 transition-colors bg-white/20 backdrop-blur-sm">
          {isPlaying ? (
            <svg
              className="w-6 h-6 md:w-8 md:h-8 text-neutral-900"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 md:w-8 md:h-8 text-neutral-900 ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
        <span className="text-lg md:text-xl font-light text-neutral-900">
          {isPlaying ? "Pause podkast" : "Hør på podkasten"}
        </span>
      </button>

      {audioUrl ? (
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="none"
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        />
      ) : null}
    </div>
  );
}
