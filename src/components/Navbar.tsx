"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="relative md:fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 md:px-12 md:py-6 text-neutral-950">
        <div className="text-[10px] md:text-sm font-bold tracking-widest uppercase leading-none md:leading-normal">
          {/* Optional Logo or Home Link */}
          <Link href="/" className="hover:opacity-70 transition-opacity">
            Den<br className="md:hidden" /> Vanskelige<br className="md:hidden" /> Samtalen
          </Link>
        </div>
        
        <button 
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 text-[10px] md:text-sm font-bold tracking-widest uppercase leading-none md:leading-normal hover:opacity-70 transition-opacity"
        >
          <span>Om Prosjektet</span>
          <div className="flex flex-col gap-[4px] md:gap-[6px] w-5 md:w-6">
            <span className="block w-full h-[1px] bg-neutral-950 group-hover:w-3/4 transition-all ml-auto" />
            <span className="block w-full h-[1px] bg-neutral-950" />
            <span className="block w-full h-[1px] bg-neutral-950 group-hover:w-1/2 transition-all ml-auto" />
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
                  <h2 className="text-xs md:text-sm text-neutral-500 uppercase tracking-widest mb-6">Om Prosjektet</h2>
                  <h1 className="text-4xl md:text-6xl font-light mb-8 text-neutral-900">The Difficult Conversation</h1>
                  <p className="text-xl md:text-2xl font-light text-neutral-600 mb-8">Podcast – work in progress</p>
                  
                  <div className="space-y-6 text-base md:text-lg font-light leading-relaxed text-neutral-700">
                    <p>
                      «The Difficult Conversation» is an artistic project that originates from a deep crisis in communication between two friends and colleagues, Unni Gjertsen and Runa Carlsen.
                    </p>
                    <p>
                      Arriving from contrasting backgrounds and perspectives on the Israeli-Palestinian conflict, with help from Nansen Fredssenter, they explore dialogue as a tool for avoiding silence and ghosting.
                    </p>
                    <p>
                      Central to the project are seven podcast episodes, each designed to foster open, honest, and challenging conversations. Without the pressure to reach consensus, the dialogues delve into themes such as identity, trauma, polarization, and critical thinking.
                    </p>
                  </div>

                  <div className="mt-12 pt-12 border-t border-neutral-200">
                    <h3 className="text-xs text-neutral-500 uppercase tracking-widest mb-4">Collaborators</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      Astrid Folkedal Kraidy (Nansen Fredssenter), Stephan Lyngved (Flink Pike Podcast Production), performance artists Hanna Filomen Mjåvatn and Mariko Miyata.
                    </p>
                  </div>
                </motion.div>
              </section>

              {/* Artists Section (Secondary Focus) */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 pt-12 border-t border-neutral-200/50">
                
                {/* Unni */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <h3 className="text-2xl font-light text-neutral-900 mb-2">Unni Gjertsen</h3>
                  <p className="text-sm text-neutral-500 uppercase tracking-wider mb-6">Visual artist, filmmaker, and writer</p>
                  
                  <div className="space-y-4 text-sm md:text-base font-light text-neutral-600 leading-relaxed mb-8">
                    <p>
                      Unni Gjertsen (b. 1966, Norway) is a visual artist, filmmaker, and writer based in Oslo. Her interdisciplinary practice explores how we perceive geography and history, often employing ecological and feminist perspectives. She uses film, performance, text, and installation to explore how narratives about place and history are constructed and experienced.
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <a href="https://unnigjertsen.com" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-900 hover:text-neutral-600 transition-colors underline underline-offset-4 decoration-neutral-300">
                      unnigjertsen.com
                    </a>
                  </div>
                </motion.div>

                {/* Runa */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <h3 className="text-2xl font-light text-neutral-900 mb-2">Runa Carlsen</h3>
                  <p className="text-sm text-neutral-500 uppercase tracking-wider mb-6">Visual artist</p>
                  
                  <div className="space-y-4 text-sm md:text-base font-light text-neutral-600 leading-relaxed mb-8">
                    <p>
                      Jeg er interessert i tekstil som materiale og dens historie og hvordan det er uløselig forbundet med komplekse strukturer i samfunnet. Jeg arbeider på tvers av tekstil, performance, film, tekst, installasjon og intervensjoner i sosiale situasjoner og offentlige rom.
                    </p>
                    <p>
                      Jeg bruker en stedssensitiv tilnærming og samarbeid som metode i mine estetiske undersøkelser. I noen arbeider fletter jeg biografisk materiale sammen med funn fra offentlige arkiv, for å bøte på som har falt ut vårt kollektive minnet.
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <a href="https://www.runacarlsen.no/" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-900 hover:text-neutral-600 transition-colors underline underline-offset-4 decoration-neutral-300">
                      runacarlsen.no
                    </a>
                  </div>
                </motion.div>

              </section>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
