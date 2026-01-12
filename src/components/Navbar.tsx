"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { renderRichText } from "@/lib/renderRichText";

type NavData = {
  about: {
    sectionLabel: string;
    heading: string;
    subtitle: string;
    description: any; // Rich text content
    partnersHeading: string;
    partnersText: string;
  };
  artists: Array<{
    name: string;
    role: string;
    bio: any; // Rich text content
    website?: string;
  }>;
};

export function Navbar({ data }: { data?: NavData }) {
  const [isOpen, setIsOpen] = useState(false);

  const navData = data || {
    about: {
      sectionLabel: "Om Prosjektet",
      heading: "Den vanskelige samtalen",
      subtitle: "Podkast – work in progress",
      description: [
        "«Den vanskelige samtalen» er et kunstnerisk prosjekt som springer ut av en dyp kommunikasjonskrise mellom to venner og kollegaer, Unni Gjertsen og Runa Carlsen.",
        "Med utgangspunkt i ulike bakgrunner og perspektiver på den israelsk-palestinske konflikten utforsker de, med hjelp fra Nansen Fredssenter, dialog som et verktøy for å unngå stillhet og ghosting.",
        "Kjernen i prosjektet er syv podkastepisoder, hver med mål om å fremme åpne, ærlige og utfordrende samtaler. Uten press om å oppnå enighet går dialogene i dybden på temaer som identitet, traumer, polarisering og kritisk tenkning."
      ],
      partnersHeading: "Samarbeidspartnere",
      partnersText: "Co Producent: ProductionSelskapet Konsept AS, Nansen Fredssenter Lillehammer."
    },
    artists: [
      {
        name: "Unni Gjertsen",
        role: "Billedkunstner, filmskaper og forfatter",
        bio: ["Unni Gjertsen (f. 1966, Norge) er en billedkunstner, filmskaper og forfatter basert i Oslo. Hennes tverrfaglige praksis utforsker hvordan vi oppfatter geografi og historie, ofte ved å bruke økologiske og feministiske perspektiver. Hun bruker film, performance, tekst og installasjon til å utforske hvordan narrativer om sted og historie blir konstruert og erfart."],
        website: "https://unnigjertsen.com"
      },
      {
        name: "Runa Carlsen",
        role: "Billedkunstner",
        bio: [
          "Jeg undersøker hvordan sosiale og historiske strukturer former fellesskap, solidaritet og identitet. Over tid har jeg arbeidet med hvordan tekstil som materiale er tett knyttet til samfunnets økonomiske og økologiske systemer – fra antropocen til kolonialisme og kapitalisme.",
          "Jeg arbeider på tvers av medier, hovedsakelig med tekstil, performance og video, og bruker dokumentariske, stedssensitive og relasjonelle strategier. Samarbeid med andre kunstnere og fagpersoner er en sentral del av min praksis. Jeg ønsker at arbeidene mine skal åpne for refleksjon, handling – og i siste instans, endring."
        ],
        website: "https://www.runacarlsen.no/"
      }
    ]
  };

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="relative md:fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 md:px-12 md:py-6 text-neutral-950">
        <div className="text-[10px] md:text-sm font-bold tracking-widest uppercase leading-none md:leading-normal">
          {/* Optional Logo or Home Link */}
          <Link href="/" className="hover:opacity-70 transition-opacity">
            
          </Link>
        </div>
        
        <button 
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 text-[10px] md:text-sm font-bold tracking-widest uppercase leading-none md:leading-normal hover:opacity-70 transition-opacity"
        >
          <span></span>
          <div className="flex flex-col gap-[10px] md:gap-[12px] w-15 md:w-17">
            <span className="block w-full h-[3px] bg-neutral-950 group-hover:w-3/4 transition-all ml-auto" />
            <span className="block w-full h-[3px] bg-neutral-950" />
            <span className="block w-full h-[3px] bg-neutral-950 group-hover:w-1/2 transition-all ml-auto" />
          </div>
        </button>
      </nav>

      {/* Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-white text-neutral-900 overflow-y-auto"
          >
            {/* Close Button */}
            <div className="absolute top-6 right-6 md:top-12 md:right-12 z-50">
              <button 
                onClick={() => setIsOpen(false)}
                className="group flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:text-black transition-colors"
              >
                <span>Lukk</span>
                <div className="relative w-6 h-6">
                  <span className="absolute top-1/2 left-0 w-full h-[1px] bg-neutral-600 rotate-45 group-hover:bg-black transition-colors" />
                  <span className="absolute top-1/2 left-0 w-full h-[1px] bg-neutral-600 -rotate-45 group-hover:bg-black transition-colors" />
                </div>
              </button>
            </div>

            <div className="min-h-screen w-full max-w-5xl mx-auto px-6 py-24 md:py-32 flex flex-col gap-24">
              
              {/* Project Section (Primary Focus) */}
              <section className="max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <h2 className="text-xs md:text-sm text-neutral-500 uppercase tracking-widest mb-6">{navData.about.sectionLabel}</h2>
                  <h1 className="text-4xl md:text-6xl font-light mb-8 text-neutral-900">{navData.about.heading}</h1>
                  <p className="text-xl md:text-2xl font-light text-neutral-600 mb-8">{navData.about.subtitle}</p>
                  
                  <div className="space-y-6 text-base md:text-lg font-light leading-relaxed text-neutral-700">
                    {renderRichText(navData.about.description)}
                  </div>

                  <div className="mt-12 pt-12 border-t border-neutral-200">
                    <h3 className="text-xs text-neutral-500 uppercase tracking-widest mb-4">{navData.about.partnersHeading}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {navData.about.partnersText}
                    </p>
                  </div>
                </motion.div>
              </section>

              {/* Artists Section (Secondary Focus) */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 pt-12 border-t border-neutral-200/50">
                {navData.artists.map((artist, index) => (
                  <motion.div
                    key={artist.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1), duration: 0.8 }}
                  >
                    <h3 className="text-2xl font-light text-neutral-900 mb-2">{artist.name}</h3>
                    <p className="text-sm text-neutral-500 uppercase tracking-wider mb-6">{artist.role}</p>
                    
                    <div className="space-y-4 text-sm md:text-base font-light text-neutral-600 leading-relaxed mb-8">
                      {renderRichText(artist.bio)}
                    </div>
                    
                    {artist.website && (
                      <div className="flex flex-col gap-2">
                        <a href={artist.website} target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-900 hover:text-neutral-600 transition-colors underline underline-offset-4 decoration-neutral-300">
                          {artist.website.replace('https://', '').replace('www.', '').replace(/\/$/, '')}
                        </a>
                      </div>
                    )}
                  </motion.div>
                ))}
              </section>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
