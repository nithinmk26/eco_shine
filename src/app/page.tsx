import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import HashScrollHandler from "@/components/HashScrollHandler";
import { categories, totalDoors } from "@/data/catalogue";

const commitments = [
  "100% seasoned and chemically treated wood, matched to international standards.",
  "Customized designs built to customer requirement, with accuracy and a sophisticated finish.",
  "Timely delivery and after-sales service from a devoted professional and technical team.",
  "Eco-friendly doors that conserve the environment they are welcomed into.",
];

export default function Home() {
  const heroImage =
    categories.find((c) => c.slug === "luxur-veneer-door")?.hero ?? "/doors/luxur-veneer-door/hero.webp";

  return (
    <>
      <HashScrollHandler />
      <Hero image={heroImage} />

      {/* Intro / About */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-28 md:py-36">
        <div className="grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">The 2026 Edition</p>
          </Reveal>
          <div className="md:col-span-8">
            <Reveal>
              <p className="font-display text-3xl leading-snug md:text-5xl md:leading-tight">
                Unparalleled style with door designs that transform the exquisite. Each one spells its own charm
                and exudes a spellbound impact.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-xl text-sm leading-relaxed text-ink-soft">
                Eco Shine Doors and Windows presents the collection: {totalDoors} doors across{" "}
                {categories.length} families: luxury veneer, laminated, membrane, WPC and primer coated, created
                keeping your requirements at the core.
              </p>
            </Reveal>
          </div>
        </div>
      </section>



      {/* Commitments */}
      <section className="grain relative bg-ink py-28 text-paper">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Commitments</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight md:text-5xl">
              Built on seasoned wood. Kept with seasoned word.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {commitments.map((text, i) => (
              <Reveal key={text} delay={i * 0.08} className="flex gap-6 border-t border-paper/15 pt-6">
                <span className="font-display text-2xl text-gold">{String(i + 1).padStart(2, "0")}</span>
                <p className="max-w-md text-sm leading-relaxed text-paper/80">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="border-t border-line bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="flex items-end justify-between">
            <h2 className="font-display text-3xl md:text-4xl">Specifications</h2>
            <p className="hidden text-[11px] uppercase tracking-[0.25em] text-ink-soft md:block">New Edition 2026</p>
          </Reveal>
          <div className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Sizes", "7′ × 3.25′ and 8′ × 4′ · 30 mm thickness"],
              ["Heights", "84″ · 81″ · 78″"],
              ["Widths", "27″ · 30″ · 32″ · 36″ · 38″"],
              ["Finish", "Matt and SF, backside uniformly sanded for easy pasting"],
            ].map(([label, value], i) => (
              <Reveal key={label} delay={i * 0.06}>
                <p className="text-[11px] uppercase tracking-[0.3em] text-gold">{label}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{value}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-12 text-[11px] uppercase tracking-[0.25em] text-ink-soft">
              Applications: Villas · Bungalows · Hotels · Offices · Apartments · Hospitals · Malls
            </p>
          </Reveal>
        </div>
      </section>

      {/* Index & Brochure Download invitation */}
      <section className="mx-auto max-w-7xl px-6 py-28 text-center md:py-36">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Catalogue &amp; Brochure</p>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
            {categories.length} families. {totalDoors} doors. Every code, at your fingertips.
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/catalogue"
            className="border border-ink bg-ink text-paper px-10 py-5 text-xs uppercase tracking-[0.3em] transition-all duration-200 hover:bg-gold hover:border-gold font-medium"
          >
            Open the index
          </Link>
          <a
            href="/Eco_Shine_Catalogue_2026.pdf"
            download="Eco_Shine_Catalogue_2026.pdf"
            className="flex items-center gap-2.5 border border-ink/40 px-8 py-5 text-xs uppercase tracking-[0.25em] text-ink transition-all duration-200 hover:border-gold hover:bg-gold hover:text-paper font-medium cursor-pointer"
          >
            <svg className="h-4 w-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download PDF Brochure</span>
          </a>
        </Reveal>
      </section>
    </>
  );
}