"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getAssetUrl } from "@/lib/assets";
import { hamberCategories } from "@/data/hamber";

export default function HamberCollections() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line pb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#E65100]" />
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#E65100] font-bold">
              Product Portfolio
            </p>
          </div>
          <h2 className="mt-3 font-display text-4xl leading-tight md:text-6xl text-ink">
            Services
          </h2>
          <p className="mt-3 text-sm text-ink-soft max-w-2xl">
            Collection Hamber presents Eco Shine&apos;s 3 core product categories: premium Flush Wood Laminated Doors, high-performance uPVC Windows &amp; Doors, and 100% waterproof WPC Frames &amp; Doors.
          </p>
        </div>
        <div className="shrink-0">
          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#0B2545] bg-cream px-3 py-1.5 rounded border border-line">
            3 Main Categories
          </span>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {hamberCategories.map((item, index) => {
          const content = (
            <div className="group flex flex-col h-full overflow-hidden rounded-xl border border-line bg-paper transition-all duration-500 hover:border-gold hover:shadow-2xl">
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink/10">
                <Image
                  src={getAssetUrl(item.hero)}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="rounded bg-paper/90 px-3 py-1 text-[10px] uppercase font-bold tracking-widest text-[#0B2545] backdrop-blur-sm border border-line/40 shadow-sm">
                    {item.badge}
                  </span>
                  {item.isExternal && (
                    <span className="rounded bg-[#E65100] px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider text-paper shadow-sm flex items-center gap-1">
                      <span>Photos</span>
                      <svg className="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </span>
                  )}
                </div>

                {/* Image Overlay Title */}
                <div className="absolute bottom-4 left-4 right-4 text-paper">
                  <span className="block text-[11px] uppercase tracking-[0.2em] text-[#E65100] font-bold">
                    {item.subtitle}
                  </span>
                  <h3 className="mt-1 font-display text-2xl md:text-3xl text-paper leading-snug group-hover:text-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-1 bg-cream/30">
                <p className="text-xs leading-relaxed text-ink-soft">
                  {item.tagline}
                </p>

                <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#0B2545]">
                    {item.stats}
                  </span>
                  
                  <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-[#E65100] font-bold group-hover:translate-x-1 transition-transform duration-300">
                    <span>{item.isExternal ? "Open Album" : "Explore"}</span>
                    {item.isExternal ? (
                      <svg className="w-3.5 h-3.5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    )}
                  </span>
                </div>
              </div>
            </div>
          );

          return (
            <Reveal key={item.id} delay={index * 0.1}>
              {item.isExternal ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold rounded-xl"
                >
                  {content}
                </a>
              ) : (
                <Link href={item.href} className="block h-full focus:outline-none focus:ring-2 focus:ring-gold rounded-xl">
                  {content}
                </Link>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
