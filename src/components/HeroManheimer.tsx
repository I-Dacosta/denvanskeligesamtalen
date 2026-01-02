"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

export function HeroManheimer() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-neutral-950 text-white flex flex-col items-center justify-center">
      {/* Background Text Layer - Behind Image */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none select-none">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            textShadow: isHovered 
              ? "0 0 80px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.8), 0 10px 30px rgba(0,0,0,0.7)"
              : "0 0 40px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.3)"
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-[13vw] leading-[0.8] font-bold tracking-tighter text-neutral-200 text-center whitespace-nowrap mix-blend-difference"
        >
          DEN VANSKELIGE
        </motion.h1>
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            textShadow: isHovered 
              ? "0 0 80px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.8), 0 10px 30px rgba(0,0,0,0.7)"
              : "0 0 40px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.3)"
          }}
          transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
          className="text-[13vw] leading-[0.8] font-bold tracking-tighter text-neutral-200 text-center whitespace-nowrap mix-blend-difference"
        >
          SAMTALEN
        </motion.h1>
      </div>

      {/* Central Image Layer */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          zIndex: isHovered ? 30 : 10,
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ 
          opacity: { duration: 1, delay: 0.3, ease: "easeOut" },
          y: { duration: 1, delay: 0.3, ease: "easeOut" },
          zIndex: { delay: isHovered ? 0 : 0.2 }, // Instant up, delayed down to avoid flickering
          scale: { duration: 0.4, ease: "easeOut" }
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative h-[85vh] w-full max-w-5xl cursor-pointer"
      >
        <Image
          src="/images/walking.png"
          alt="Unni Gjertsen & Runa Carlsen"
          fill
          className="object-contain transition-all duration-500"
          style={{ 
            filter: isHovered ? "grayscale(0%) contrast(100%)" : "grayscale(100%) contrast(125%)"
          }}
          priority
          quality={100}
        />
      </motion.div>

      {/* Foreground Details */}
      <div className="absolute top-8 left-8 z-20 mix-blend-difference">
        <p className="text-sm font-bold uppercase tracking-widest">Unni Gjertsen & Runa Carlsen</p>
      </div>
      
      <div className="absolute bottom-8 right-8 z-20 mix-blend-difference text-right">
        <p className="text-sm font-bold uppercase tracking-widest">Høsten 2026</p>
        <p className="text-xs text-neutral-400 uppercase tracking-widest mt-1">Scroll for å lese</p>
      </div>
    </section>
  );
}
