"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { RichText } from "@/components/RichText";
import { slugify } from "@/lib/slugify";

type ChapterLink = { label: string; slug: string };

type SponsorItem = {
  logo?: { url: string; alt?: string };
  logoUrl?: string;
  name?: string;
  url?: string;
};

// Shown when the CMS has no sponsors configured yet. Editors can override
// these by adding rows to the Sponsor Section in the admin panel.
const DEFAULT_SPONSORS: SponsorItem[] = [
  {
    logoUrl: "/images/fritt-ord.png",
    name: "Fritt Ord",
    url: "https://frittord.no",
  },
  {
    logoUrl: "/images/kulturradet.png",
    name: "Kulturrådet",
    url: "https://www.kulturradet.no",
  },
];

type HeroData = {
  hero: {
    subtitle: string;
    mainTitle: string;
    description: string;
    descriptionRich?: unknown;
    image?: { url: string; alt: string };
    imageCredit?: string;
  };
  navigationItems: Array<{ number: string; label: string }>;
  theme?: {
    backgroundColor?: string;
    textColor?: string;
  };
  sponsor: {
    heading: string;
    footnote?: string;
    items?: SponsorItem[];
    // legacy single-sponsor fields (kept for backward compatibility)
    logo?: { url: string; alt?: string };
    name?: string;
    subtitle?: string;
  };
};

export function HeroSliced({
  data,
  chapterLinks = [],
}: {
  data?: HeroData;
  chapterLinks?: ChapterLink[];
}) {
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
      { number: "01", label: "Podkast" },
      { number: "02", label: "Performance" },
      { number: "03", label: "Teater" },
    ],
    sponsor: {
      heading: "Støttet av",
    },
  };

  const theme = heroData.theme || {};

  // Prefer the multi-sponsor array from the CMS; fall back to a legacy single
  // logo, then to the built-in defaults (Fritt Ord + Kulturrådet).
  const sponsorItems: SponsorItem[] =
    heroData.sponsor.items && heroData.sponsor.items.length > 0
      ? heroData.sponsor.items
      : heroData.sponsor.logo
        ? [{ logo: heroData.sponsor.logo, name: heroData.sponsor.name }]
        : DEFAULT_SPONSORS;

  return (
    <section
      className="relative min-h-screen w-full bg-white text-neutral-950 flex items-center justify-center p-4 md:px-12 md:py-20 overflow-hidden"
      style={theme.backgroundColor ? { backgroundColor: theme.backgroundColor } : undefined}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 w-full max-w-7xl h-full items-start">
        
        {/* Typography Left */}
        <div className="flex flex-col h-full z-20 order-2 lg:order-1">
           <motion.div
             initial={{ opacity: 0, x: -50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
           >
             <h2
               className="text-sm md:text-base font-bold tracking-[0.2em] text-neutral-500 uppercase mb-6"
             >
                {heroData.hero.subtitle}
             </h2>
             <h1
               className="text-5xl md:text-6xl xl:text-8xl font-bold uppercase tracking-tighter leading-[0.85] text-neutral-900"
               style={theme.textColor ? { color: theme.textColor } : undefined}
             >
               {heroData.hero.mainTitle.split('\n').map((line, i) => (
                 <React.Fragment key={i}>
                   {line}
                   {i < heroData.hero.mainTitle.split('\n').length - 1 && <br />}
                 </React.Fragment>
               ))}
             </h1>
             {heroData.hero.descriptionRich ? (
               <div className="rich-text mt-10 text-lg md:text-xl text-neutral-600 max-w-md font-light leading-relaxed">
                 <RichText data={heroData.hero.descriptionRich as never} />
               </div>
             ) : (
               <p className="mt-10 text-lg md:text-xl text-neutral-600 max-w-md font-light leading-relaxed">
                 {heroData.hero.description}
               </p>
             )}
           </motion.div>

           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5, duration: 1 }}
             className="mt-16 flex flex-col gap-3 text-xs md:text-sm text-neutral-500 uppercase tracking-widest font-mono"
           >
             {heroData.navigationItems.map((item, i) => {
               // Prefer a chapter whose subtitle matches the button label;
               // otherwise fall back to position, then to the last chapter.
               const byLabel = chapterLinks.find(
                 (c) => c.slug === slugify(item.label)
               );
               const target =
                 byLabel || chapterLinks[i] || chapterLinks[chapterLinks.length - 1];
               const href = target ? `/kapittel/${target.slug}` : "/";
               return (
                 <Link
                   key={item.number || i}
                   href={href}
                   className="group flex items-center gap-4 text-left uppercase tracking-widest transition-colors hover:text-neutral-900"
                 >
                    <span className="text-neutral-400">{item.number}</span>
                    <div className="h-[1px] w-8 bg-neutral-300 transition-all group-hover:w-12 group-hover:bg-neutral-900"></div>
                    <span>{item.label}</span>
                 </Link>
               );
             })}
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
             <div className="flex flex-wrap items-center gap-8">
               {sponsorItems.map((sponsor, i) => {
                 const src =
                   sponsor.logo?.url || sponsor.logoUrl || "/images/fritt-ord.png";
                 const alt = sponsor.logo?.alt || sponsor.name || "Sponsor";
                 const logo = (
                   /* eslint-disable-next-line @next/next/no-img-element */
                   <img
                     src={src}
                     alt={alt}
                     className="h-14 w-auto object-contain opacity-80 transition-opacity hover:opacity-100"
                   />
                 );
                 return sponsor.url ? (
                   <a
                     key={i}
                     href={sponsor.url}
                     target="_blank"
                     rel="noopener noreferrer"
                   >
                     {logo}
                   </a>
                 ) : (
                   <React.Fragment key={i}>{logo}</React.Fragment>
                 );
               })}
             </div>
           </motion.div>

           {/* Footnote pinned to the bottom of the column (mt-auto) so it lines
               up with the bottom of the sliced image in the right column. */}
           <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1, duration: 1 }}
             className="mt-auto pt-8 text-xs text-neutral-400 uppercase tracking-wider"
           >
             {heroData.sponsor.footnote || "Webside under utvikling"}
           </motion.p>
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
            <p className="mt-1 md:mt-2 text-neutral-400 text-sm lg:absolute lg:left-0 lg:top-full lg:mt-2">
              {heroData.hero.imageCredit}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
