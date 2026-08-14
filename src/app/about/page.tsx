import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { getAssetUrl } from "@/lib/assets";
import { categories, totalDoors } from "@/data/catalogue";

export const metadata: Metadata = {
  title: "About Us · Eco Shine Doors & Windows",
  description:
    "Learn about Eco Shine Doors & Windows — 100% seasoned timber, custom lamination, luxury veneer, and eco-friendly door solutions.",
};

const coreValues = [
  {
    title: "100% Seasoned & Treated Wood",
    desc: "Every Eco Shine door is crafted from timber that undergoes rigorous kiln-seasoning and anti-termite chemical treatments to meet demanding international standards.",
  },
  {
    title: "Precision Customization",
    desc: "Built exactly to architect and homeowner specifications with laser-like accuracy, smooth grain finishes, and tailored dimensions for any architectural style.",
  },
  {
    title: "Eco-Friendly Conservation",
    desc: "We prioritize sustainable timber sourcing and environmentally responsible manufacturing processes that protect the environment.",
  },
  {
    title: "Dedicated Technical Support",
    desc: "From initial selection to after-sales service, our experienced technical team ensures seamless installation and long-term durability.",
  },
];

const specifications = [
  ["Standard Sizes", "7′ × 3.25′ and 8′ × 4′"],
  ["Thickness Options", "30 mm · 35 mm · 40 mm"],
  ["Heights Available", "84″ · 81″ · 78″"],
  ["Widths Available", "27″ · 30″ · 32″ · 36″ · 38″"],
  ["Surface Finishes", "Matt, Gloss, Velvet SF, and uniformly sanded backside for easy pasting"],
  ["Suitable For", "Villas, Bungalows, Hotels, Offices, Apartments, Hospitals & Malls"],
];

export default function AboutPage() {
  const heroImage = "/doors/luxur-veneer-door/hero-enhanced.png";

  return (
    <div className="bg-paper text-ink min-h-screen">
      {/* Hero Header */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-ink pt-32 pb-20 text-paper">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src={getAssetUrl(heroImage)}
            alt="Eco Shine Luxury Doors Craftsmanship"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold font-semibold">
              Add Shine To Your Home
            </p>
            <h1 className="mt-4 font-display text-5xl tracking-tight md:text-7xl">
              About Eco Shine
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper/80">
              Crafting premium doors and windows that combine timeless style, structural integrity, and sustainable timber innovation for modern living spaces.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story & Legacy Section */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid gap-16 md:grid-cols-12 items-center">
          <Reveal className="md:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold font-semibold">Our Philosophy</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl leading-tight">
              A door that speaks style, and lives strength.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-ink-soft">
              At Eco Shine Doors &amp; Windows, we believe that an entrance is more than just a barrier — it is the defining statement of your home&apos;s character.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Our New Edition 2026 catalogue features {totalDoors} distinct door models across {categories.length} specialized door families, ranging from high-end Luxury Veneer to 3D WPC and HMR Routing doors.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="md:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded bg-cream border border-line">
                <Image
                  src={getAssetUrl("/doors/luxur-veneer-door/lx-1.webp")}
                  alt="Luxury Veneer Door"
                  fill
                  sizes="350px"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded bg-cream border border-line mt-8">
                <Image
                  src={getAssetUrl("/doors/designer-laminated-doors/sld-01.webp")}
                  alt="Designer Laminated Door"
                  fill
                  sizes="350px"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core Quality Commitments */}
      <section className="grain relative bg-ink py-24 text-paper">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold font-semibold">Our Commitments</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight md:text-5xl">
              Built on seasoned wood. Kept with seasoned word.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {coreValues.map((val, i) => (
              <Reveal key={val.title} delay={i * 0.08} className="flex gap-6 border-t border-paper/15 pt-6">
                <span className="font-display text-3xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-xl text-paper">{val.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper/75">{val.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications & Technical Overview */}
      <section className="border-t border-line bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-gold font-semibold">Technical Standards</p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl">Specifications &amp; Capabilities</h2>
            </div>
            <p className="hidden text-[11px] uppercase tracking-[0.25em] text-ink-soft md:block">New Edition 2026</p>
          </Reveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {specifications.map(([label, value], i) => (
              <Reveal key={label} delay={i * 0.06} className="bg-cream/50 p-6 rounded border border-line">
                <p className="text-[11px] uppercase tracking-[0.25em] text-gold font-semibold">{label}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink">{value}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Action Footer Callout */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold font-semibold">Explore Our Products</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl md:text-5xl leading-tight">
            Discover the full Eco Shine collection
          </h2>
          <p className="mt-4 text-sm text-ink-soft max-w-md mx-auto">
            Browse all {categories.length} door families and request customized inquiries directly with our team.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/catalogue"
            className="border border-ink bg-ink text-paper px-8 py-4 text-xs uppercase tracking-[0.3em] transition-all hover:bg-gold hover:border-gold font-medium rounded-sm"
          >
            Browse Catalogue
          </Link>
          <a
            href={getAssetUrl("/Eco_Shine_Catalogue_2026.pdf")}
            download="Eco_Shine_Catalogue_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-ink/40 px-7 py-4 text-xs uppercase tracking-[0.25em] text-ink transition-all hover:border-gold hover:bg-gold hover:text-paper font-medium rounded-sm cursor-pointer"
          >
            <svg className="h-4 w-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download PDF Brochure</span>
          </a>
        </Reveal>
      </section>
    </div>
  );
}
