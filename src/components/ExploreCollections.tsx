"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getAssetUrl } from "@/lib/assets";
import { categories } from "@/data/catalogue";

export default function ExploreCollections() {
  // Select top featured collection categories for editorial presentation
  const featuredSlugs = [
    "luxur-veneer-door",
    "solid-veneer-doors",
    "laminated-groove-doors",
    "gold-patti-laminated-doors",
    "wpc-3d-doors",
    "pf-hmr-routing-doors",
  ];

  const featuredCollections = categories.filter((c) => featuredSlugs.includes(c.slug));

  return (
    <section id="collections" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line pb-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#E65100] font-bold">
            Curated Collections
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight md:text-6xl text-ink">
            Explore Our Door Collections
          </h2>
        </div>
        <Link
          href="/catalogue"
          className="w-fit flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#0B2545] hover:text-[#E65100] transition-colors"
        >
          <span>View All 25 Collections</span>
          <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </Reveal>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {featuredCollections.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.08}>
            <Link
              href={`/catalogue/${c.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-line bg-paper transition-all duration-300 hover:border-gold hover:shadow-xl"
            >
              {/* Collection Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-ink/10">
                <Image
                  src={getAssetUrl(c.hero ?? c.doors[0]?.image ?? "/doors/luxur-veneer-door/hero.webp")}
                  alt={c.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute bottom-4 left-4 right-4 text-paper">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#E65100] font-bold bg-paper/90 px-2.5 py-1 rounded inline-block mb-1">
                    {c.doors.length} Door Designs
                  </span>
                  <h3 className="font-display text-2xl text-paper leading-tight">{c.name}</h3>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="p-5 flex items-center justify-between bg-cream/40 group-hover:bg-cream/80 transition-colors">
                <span className="text-xs text-ink-soft font-medium">Page {c.indexPage} · 2026 Edition</span>
                <span className="flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] text-[#0B2545] font-semibold group-hover:text-[#E65100] transition-colors">
                  <span>Explore</span>
                  <svg className="w-3.5 h-3.5 stroke-current fill-none transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
