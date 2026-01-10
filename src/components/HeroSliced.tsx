"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

export function HeroSliced() {
  const slices = 5;
  // Horizontal offsets to create a "broken" staggered effect
  const offsets = ["0%", "1%", "-1%", "1%", "-1%"];
  
  return (
    <section className="relative min-h-screen w-full bg-white text-neutral-950 flex items-center justify-center p-4 md:px-12 md:py-20 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 w-full max-w-7xl h-full items-start">
        
        {/* Typography Left */}
        <div className="flex flex-col h-full z-20 order-2 lg:order-1">
           <motion.div
             initial={{ opacity: 0, x: -50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
           >
             <h2 className="text-sm md:text-base font-bold tracking-[0.2em] text-neutral-500 uppercase mb-6">
                Unni Gjertsen & Runa Carlsen
             </h2>
             <h1 className="text-5xl md:text-6xl xl:text-8xl font-bold uppercase tracking-tighter leading-[0.85] text-neutral-900">
               DEN<br/>VANSKELIGE<br/>SAMTALEN
             </h1>
             <p className="mt-10 text-lg md:text-xl text-neutral-600 max-w-md font-light leading-relaxed">
               En kunstnerisk utforskning av dialogens potensiale.
             </p>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5, duration: 1 }}
             className="mt-16 flex flex-col gap-3 text-xs md:text-sm text-neutral-500 uppercase tracking-widest font-mono"
           >
             <div className="flex items-center gap-4">
                <span className="text-neutral-400">01</span>
                <div className="h-[1px] w-8 bg-neutral-300"></div>
                <span>Om Prosjektet</span>
             </div>
             <div className="flex items-center gap-4">
                <span className="text-neutral-400">02</span>
                <div className="h-[1px] w-8 bg-neutral-300"></div>
                <span>Podkast</span>
             </div>
             <div className="flex items-center gap-4">
                <span className="text-neutral-400">03</span>
                <div className="h-[1px] w-8 bg-neutral-300"></div>
                <span>Performance</span>
             </div>
             <div className="flex items-center gap-4">
                <span className="text-neutral-400">04</span>
                <div className="h-[1px] w-8 bg-neutral-300"></div>
                <span>Teater</span>
             </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.8, duration: 1 }}
             className="mt-16 pt-8 border-t border-neutral-200"
           >
             <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">Støttet av</p>
             <div className="flex items-center gap-4">
               <Image 
                 src="/images/fritt-ord.png" 
                 alt="Fritt Ord Logo" 
                 width={80} 
                 height={80}
                 className="opacity-80 hover:opacity-100 transition-opacity"
               />
               <div className="flex flex-col">
                 <span className="text-sm font-semibold text-neutral-700">Fritt Ord</span>
                 <span className="text-xs text-neutral-500">Stiftelsen</span>
               </div>
             </div>
           </motion.div>
        </div>

        {/* Sliced Image Right */}
        <div className="relative w-full flex flex-col order-1 lg:order-2">
          <div className="relative w-full h-[60vh] md:h-[80vh] flex flex-col gap-[5px]">
            {[...Array(slices)].map((_, i) => (
              <motion.div 
                key={i}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: offsets[i], opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                className="relative w-full flex-1 overflow-hidden bg-neutral-100/50"
              >
                 <div 
                   className="absolute w-full left-0"
                   style={{ 
                     height: `${slices * 100}%`,
                     top: `-${i * 100}%`
                   }}
                 >
                   <Image
                     src="/images/walking.png"
                     alt="Walking Sliced"
                     fill
                     className="object-cover grayscale contrast-125"

                     priority
                   />
                 </div>
              </motion.div>
            ))}
          </div>
          <p className="mt-1 md:mt-2 text-neutral-400 text-sm">Foto: Marte Aas</p>
        </div>
      </div>
    </section>
  );
}
