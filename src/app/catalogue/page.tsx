import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getAssetUrl } from "@/lib/assets";
import { categories, totalDoors } from "@/data/catalogue";

export const metadata: Metadata = {
  title: "Catalogue Index · Eco Shine Doors 2026 Collection (572+ Designs)",
  description:
    "Browse the complete 2026 Eco Shine door index: 25 door collections from luxury veneer to WPC membrane, every door with its model code.",
  alternates: {
    canonical: "https://ecoshinedoors.in/catalogue",
  },
  openGraph: {
    title: "Catalogue Index · Eco Shine Doors 2026 Collection",
    description: "25 specialized door collections featuring 572+ designs with model codes.",
    url: "https://ecoshinedoors.in/catalogue",
    images: ["https://ecoshinedoors.in/doors/luxur-veneer-door/hero.webp"],
  },
};

const catalogueJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Eco Shine Doors Catalogue Index 2026",
  "url": "https://ecoshinedoors.in/catalogue",
  "description": "Index of 25 specialized door collections containing 572+ door designs.",
  "numberOfItems": categories.length,
};

export default function CatalogueIndex() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-28 pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogueJsonLd) }}
      />
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#E65100] font-bold">Eco Shine · New Edition 2026</p>
        <h1 className="mt-4 font-display text-6xl tracking-tight md:text-8xl">Index</h1>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-ink-soft">
          {categories.length} collections, {totalDoors} doors. Choose a collection to see every door with its code.
        </p>
      </Reveal>

      <div className="mt-20 border-t border-line">
        {categories.map((c, i) => (
          <Reveal key={c.slug} as="div" y={20} delay={Math.min(i * 0.04, 0.4)}>
            <Link
              href={`/catalogue/${c.slug}`}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-line py-6 transition-colors duration-300 hover:bg-cream md:grid-cols-[5rem_auto_1fr_auto_auto] md:gap-10 md:px-4"
            >
              <span className="font-display text-3xl text-ink/25 transition-colors duration-300 group-hover:text-gold md:text-4xl">
                {String(c.indexPage).padStart(2, "0")}
              </span>
              <span className="relative hidden h-20 w-10 overflow-hidden bg-cream/70 md:block p-0.5 border border-line/50 rounded-sm">
                {c.doors[0] && (
                  <Image
                    src={getAssetUrl(c.doors[0].image)}
                    alt={`Eco Shine ${c.name} preview`}
                    fill
                    sizes="40px"
                    className="object-contain transition-transform duration-300 ease-out"
                  />
                )}
              </span>
              <span>
                <span className="block font-display text-2xl leading-tight transition-transform duration-300 ease-out group-hover:translate-x-2 md:text-3xl">
                  {c.name}
                </span>
                {c.tagline && (
                  <span className="mt-1 block text-xs italic text-ink-soft">{c.tagline}</span>
                )}
              </span>
              <span className="text-right text-[11px] uppercase tracking-[0.2em] text-ink-soft">
                {String(c.doors.length).padStart(2, "0")}
                <br />
                doors
              </span>
              <span
                aria-hidden
                className="hidden text-xl text-gold opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 md:block"
              >
                →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}