"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getAssetUrl } from "@/lib/assets";

const spaces = [
  {
    title: "Main Entrance",
    subtitle: "Grand Luxury & Solid Veneer Statements",
    image: "/doors/luxur-veneer-door/hero.webp",
    link: "/catalogue/luxur-veneer-door",
  },
  {
    title: "Bedrooms & Living",
    subtitle: "Warm Aesthetics & Designer Laminates",
    image: "/doors/designer-laminated-doors/sld-01.webp",
    link: "/catalogue/laminated-groove-doors",
  },
  {
    title: "Bathrooms & Wet Areas",
    subtitle: "100% Water Resistant 3D WPC & Membrane",
    image: "/doors/wpc-3d-doors/hero.webp",
    link: "/catalogue/wpc-3d-doors",
  },
  {
    title: "Offices & Workspaces",
    subtitle: "Precision HMR CNC Routing & Modern Cut",
    image: "/doors/pf-hmr-routing-doors/hero.webp",
    link: "/catalogue/pf-hmr-routing-doors",
  },
  {
    title: "Hospitality & Commercial",
    subtitle: "Heavy Duty Seasoned Wood Built to Last",
    image: "/doors/solid-veneer-doors/hero.webp",
    link: "/catalogue/solid-veneer-doors",
  },
];

export default function SpaceApplications() {
  return (
    <section id="applications" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <Reveal className="text-center max-w-3xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#E65100] font-bold">
          Architectural Compatibility
        </p>
        <h2 className="mt-3 font-display text-4xl leading-tight md:text-6xl text-ink">
          Doors for Every Space
        </h2>
        <p className="mt-4 text-sm text-ink-soft leading-relaxed">
          From grand villa entrances to moisture-resistant bathroom doors and high-traffic commercial spaces, Eco Shine provides engineered solutions for every room.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {spaces.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <Link
              href={s.link}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-line aspect-[4/3] bg-ink"
            >
              <Image
                src={getAssetUrl(s.image)}
                alt={s.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover opacity-75 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

              <div className="relative z-10 mt-auto p-6 text-paper">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#E65100] font-bold block mb-1">
                  Application
                </span>
                <h3 className="font-display text-2xl leading-tight text-paper">{s.title}</h3>
                <p className="mt-1 text-xs text-paper/80 font-medium">{s.subtitle}</p>

                <div className="mt-4 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-paper font-semibold group-hover:text-[#E65100] transition-colors">
                  <span>Explore Doors</span>
                  <svg className="w-3.5 h-3.5 stroke-current fill-none transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
