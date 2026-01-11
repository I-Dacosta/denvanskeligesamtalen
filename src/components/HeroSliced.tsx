"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

type HeroData = {
  hero: {
    subtitle: string;
    mainTitle: string;
    description: string;
    image?: { url: string; alt: string };
    imageCredit?: string;
  };
  navigationItems: Array<{ number: string; label: string }>;
  sponsor: {
    heading: string;
    logo?: { url: string; alt: string };
    name: string;
    subtitle: string;
  };
};

export function HeroSliced({ data }: { data?: HeroData }) {
  const slices = 5;
  // Horizontal offsets to create a "broken" staggered effect
  const offsets = ["0%", "1%", "-1%", "1%", "-1%"];
  
  // Fallback to default values if no data provided
  const heroData = data || {
    hero: {
      subtitle: "Unni Gjertsen & Runa Carlsen",
      mainTitle: "DEN\nVANSKELIGE\nSAMTALEN",
      description: "En kunstnerisk utforskning av dialogens potensiale.",
      imageCredit: "Foto: Marte Aas",
    },
    navigationItems: [
      { number: "01", label: "Om Prosjektet" },
      { number: "02", label: "Podkast" },
      { number: "03", label: "Performance" },
      { number: "04", label: "Teater" },
    ],
    sponsor: {
      heading: "Støttet av",
      name: "Fritt Ord",
      subtitle: "Stiftelsen",
    },
  };
  
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
                {heroData.hero.subtitle}
             </h2>
             <h1 className="text-5xl md:text-6xl xl:text-8xl font-bold uppercase tracking-tighter leading-[0.85] text-neutral-900">
               {heroData.hero.mainTitle.split('\n').map((line, i) => (
                 <React.Fragment key={i}>
                   {line}
                   {i < heroData.hero.mainTitle.split('\n').length - 1 && <br />}
                 </React.Fragment>
               ))}
             </h1>
             <p className="mt-10 text-lg md:text-xl text-neutral-600 max-w-md font-light leading-relaxed">
               {heroData.hero.description}
             </p>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5, duration: 1 }}
             className="mt-16 flex flex-col gap-3 text-xs md:text-sm text-neutral-500 uppercase tracking-widest font-mono"
           >
             {heroData.navigationItems.map((item) => (
               <div key={item.number} className="flex items-center gap-4">
                  <span className="text-neutral-400">{item.number}</span>
                  <div className="h-[1px] w-8 bg-neutral-300"></div>
                  <span>{item.label}</span>
               </div>
             ))}
           </motion.div>

           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.8, duration: 1 }}
             className="mt-16 pt-8 border-t border-neutral-200"
           >
             <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">
               {heroData.sponsor.heading}
             </p>
             <div className="flex items-center gap-4">
               {heroData.sponsor.logo ? (
                 <Image 
                   src={heroData.sponsor.logo.url} 
                   alt={heroData.sponsor.logo.alt || heroData.sponsor.name} 
                   width={80} 
                   height={80}
                   className="opacity-80 hover:opacity-100 transition-opacity"
                 />
               ) : (
                 <Image 
                   src="/images/fritt-ord.png" 
                   alt="Fritt Ord Logo" 
                   width={80} 
                   height={80}
                   className="opacity-80 hover:opacity-100 transition-opacity"
                 />
               )}
               <div className="flex flex-col">
                 <span className="text-sm font-semibold text-neutral-700">
                   {heroData.sponsor.name}
                 </span>
                 <span className="text-xs text-neutral-500">
                   {heroData.sponsor.subtitle}
                 </span>
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
                     src={heroData.hero.image?.url || "/images/walking.png"}
                     alt={heroData.hero.image?.alt || "Walking Sliced"}
                     fill
                     className="object-cover grayscale contrast-125"

                     priority
                   />
                 </div>
              </motion.div>
            ))}
          </div>
          {heroData.hero.imageCredit && (
            <p className="mt-1 md:mt-2 text-neutral-400 text-sm">{heroData.hero.imageCredit}</p>
          )}
        </div>
      </div>
    </section>
  );
}
