import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getAssetUrl } from "@/lib/assets";
import { categories, totalDoors } from "@/data/catalogue";

export const metadata: Metadata = {
  title: "Catalogue Index · Eco Shine Doors & Windows",
  description:
    "The Eco Shine New Edition 2026 index: 25 door families from luxury veneer to WPC membrane, every door with its product code.",
};

export default function CatalogueIndex() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-28 pt-36">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Eco Shine · New Edition 2026</p>
        <h1 className="mt-4 font-display text-6xl tracking-tight md:text-8xl">Index</h1>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-ink-soft">
          {categories.length} families, {totalDoors} doors. Choose a collection to see every door with its code.
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
              <span className="relative hidden h-20 w-14 overflow-hidden bg-cream md:block">
                {c.doors[0] && (
                  <Image
                    src={getAssetUrl(c.doors[0].image)}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110"
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