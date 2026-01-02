"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-neutral-950 text-white flex flex-col items-center justify-center">
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-neutral-900/50 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full max-w-7xl mx-auto px-6">
        
        {/* Typography - Top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center z-20 mb-8 md:mb-12"
        >
          <h2 className="text-sm md:text-base font-light tracking-[0.3em] text-neutral-400 uppercase mb-4">
            Unni Gjertsen & Runa Carlsen
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-thin tracking-widest uppercase text-neutral-100 mix-blend-overlay">
            Den<br className="md:hidden" /> Vanskelige<br className="md:hidden" /> Samtalen
          </h1>
        </motion.div>

        {/* Central Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-lg md:max-w-2xl aspect-[4/5] md:aspect-square flex items-center justify-center"
        >
          <Image
            src="/images/walkingbg.png"
            alt="To personer som går sammen"
            fill
            className="object-contain drop-shadow-2xl"
            priority
            quality={100}
          />
        </motion.div>

        {/* Typography - Bottom / Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="absolute bottom-12 md:bottom-16 text-center z-20 max-w-md"
        >
          <p className="text-lg md:text-xl font-light italic text-neutral-300 leading-relaxed">
            "En reise gjennom stillhet og dialog"
          </p>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mt-8 flex justify-center"
          >
            <div className="w-[1px] h-12 bg-gradient-to-b from-neutral-500 to-transparent" />
          </motion.div>
        </motion.div>

      </div>
      
      {/* Grain Overlay for texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
    </section>
  );
}
