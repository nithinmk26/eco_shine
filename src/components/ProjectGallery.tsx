"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getAssetUrl } from "@/lib/assets";

const gallery = [
  {
    title: "Luxury Veneer Residence",
    category: "Veneer Series",
    image: "/doors/luxur-veneer-door/hero.webp",
    link: "/catalogue/luxur-veneer-door",
  },
  {
    title: "Architectural Laminated Groove",
    category: "Laminated Series",
    image: "/doors/laminated-groove-doors/hero.webp",
    link: "/catalogue/laminated-groove-doors",
  },
  {
    title: "Modern 3D WPC Villa Entrance",
    category: "3D WPC Series",
    image: "/doors/wpc-3d-doors/hero.webp",
    link: "/catalogue/wpc-3d-doors",
  },
  {
    title: "Precision HMR CNC Craft",
    category: "CNC Routing Series",
    image: "/doors/pf-hmr-routing-doors/hero.webp",
    link: "/catalogue/pf-hmr-routing-doors",
  },
];

export default function ProjectGallery() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-24 md:py-32 border-t border-line">
      <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line pb-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#E65100] font-bold">
            Project Showcase
          </p>
          <h2 className="mt-3 font-display text-4xl leading-tight md:text-6xl text-ink">
            Designed for Real Spaces
          </h2>
        </div>
        <p className="max-w-md text-xs text-ink-soft leading-relaxed">
          See how Eco Shine door collections integrate into luxury villas, modern apartments, boutique hotels, and corporate workspaces.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {gallery.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.08}>
            <Link
              href={g.link}
              className="group flex flex-col overflow-hidden rounded-lg border border-line bg-paper transition-all duration-300 hover:shadow-xl hover:border-gold"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-ink/10">
                <Image
                  src={getAssetUrl(g.image)}
                  alt={`Eco Shine ${g.title} - ${g.category}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-paper">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#E65100] font-bold block mb-1">
                    {g.category}
                  </span>
                  <h3 className="font-display text-xl text-paper leading-snug">{g.title}</h3>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
