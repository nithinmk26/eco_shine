import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import HashScrollHandler from "@/components/HashScrollHandler";
import BenefitsStrip from "@/components/BenefitsStrip";
import HamberCollections from "@/components/HamberCollections";
import ExploreCollections from "@/components/ExploreCollections";
import SpaceApplications from "@/components/SpaceApplications";
import WhyEcoShine from "@/components/WhyEcoShine";
import ProjectGallery from "@/components/ProjectGallery";
import { getAssetUrl } from "@/lib/assets";
import { categories, totalDoors } from "@/data/catalogue";

export default function Home() {
  const heroImage =
    categories.find((c) => c.slug === "luxur-veneer-door")?.hero ?? "/doors/luxur-veneer-door/hero.webp";

  return (
    <>
      <HashScrollHandler />
      
      {/* 1. HERO SECTION */}
      <Hero image={heroImage} />

      {/* 2. KEY BENEFITS STRIP */}
      <BenefitsStrip />

      {/* 3. INTRODUCTION / BRAND STATEMENT */}
      <section id="about-intro" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <Reveal className="lg:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#E65100] font-bold">The 2026 Edition</p>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl text-ink">
              Unparalleled style with door designs that transform the exquisite.
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-7">
            <p className="text-base leading-relaxed text-ink-soft">
              Eco Shine Doors &amp; Windows presents the complete 2026 collection: {totalDoors} distinct door models across {categories.length} specialized collections. Built from 100% seasoned wood, our doors are engineered to meet international standards for durability, moisture resistance, and timeless architectural appeal.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div>
                <span className="font-display text-3xl text-[#0B2545] font-bold block">{totalDoors}+</span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">Door Designs</span>
              </div>
              <div className="h-8 w-px bg-line" />
              <div>
                <span className="font-display text-3xl text-[#0B2545] font-bold block">{categories.length}</span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">Collections</span>
              </div>
              <div className="h-8 w-px bg-line" />
              <div>
                <span className="font-display text-3xl text-[#E65100] font-bold block">100%</span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">Seasoned Wood</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. COLLECTION HAMBER (3 MAIN CATEGORIES) */}
      <HamberCollections />

      {/* 5. EXPLORE OUR DOOR COLLECTIONS */}
      <ExploreCollections />

      {/* 7. DOORS FOR EVERY SPACE (APPLICATIONS) */}
      <SpaceApplications />

      {/* 8. WHY ECO SHINE? (BRAND TRUST) */}
      <WhyEcoShine />

      {/* 9. PROJECT / INSPIRATION GALLERY */}
      <ProjectGallery />

      {/* 10. TECHNICAL SPECIFICATIONS */}
      <section className="border-t border-line bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="flex items-end justify-between border-b border-line pb-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#E65100] font-bold">Technical Standards</p>
              <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink">Specifications &amp; Customization</h2>
            </div>
            <p className="hidden text-[11px] uppercase tracking-[0.25em] text-ink-soft md:block">New Edition 2026</p>
          </Reveal>
          
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal delay={0.05} className="bg-cream/60 p-6 rounded-lg border border-line">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#0B2545] font-bold">Standard Width Range</p>
              <p className="mt-2 text-base text-ink font-semibold">2.25 ft to 4.5 ft</p>
              <p className="mt-1 text-xs text-ink-soft">27″ · 30″ · 32″ · 36″ · 38″ · 42″ · 48″</p>
            </Reveal>

            <Reveal delay={0.1} className="bg-cream/60 p-6 rounded-lg border border-line">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#0B2545] font-bold">Standard Length Range</p>
              <p className="mt-2 text-base text-ink font-semibold">6.25 ft to 10 ft</p>
              <p className="mt-1 text-xs text-ink-soft">78″ · 81″ · 84″ · 96″ · 120″</p>
            </Reveal>

            <Reveal delay={0.15} className="bg-cream/60 p-6 rounded-lg border border-line">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#0B2545] font-bold">Thickness Range</p>
              <p className="mt-2 text-base text-ink font-semibold">25 mm to 60 mm</p>
              <p className="mt-1 text-xs text-ink-soft">30 mm · 35 mm · 40 mm · 50 mm · 60 mm</p>
            </Reveal>

            <Reveal delay={0.2} className="bg-cream/60 p-6 rounded-lg border border-line">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#0B2545] font-bold">Surface &amp; Paste Finish</p>
              <p className="mt-2 text-base text-ink font-semibold">Matt &amp; SF Uniform Sanded</p>
              <p className="mt-1 text-xs text-ink-soft">Backside uniformly sanded for easy pasting</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 11. CATALOGUE & BROCHURE CTA */}
      <section className="border-t border-line bg-cream/70 py-28 text-center md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#E65100] font-bold">Complete 2026 Collection</p>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-tight md:text-6xl text-ink">
              {categories.length} Collections. {totalDoors} Doors. Every Code at Your Fingertips.
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-sm text-ink-soft leading-relaxed">
              Explore the full interactive catalogue index or download our official high-resolution 2026 PDF brochure.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/catalogue"
              className="bg-[#0B2545] text-paper px-9 py-4.5 text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-200 hover:bg-[#E65100] rounded shadow-md"
            >
              Open Catalogue Index
            </Link>
            <a
              href={getAssetUrl("/Eco_Shine_Catalogue_2026.pdf")}
              download="Eco_Shine_Catalogue_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 border border-ink/40 bg-paper px-8 py-4.5 text-xs uppercase tracking-[0.25em] text-ink transition-all duration-200 hover:border-[#E65100] hover:text-[#E65100] font-semibold cursor-pointer rounded shadow-sm"
            >
              <svg className="h-4 w-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download PDF Brochure</span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* 12. FINAL CONVERSION CTA */}
      <section className="bg-ink py-28 text-paper text-center border-t border-line">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#E65100] font-bold">Get In Touch</p>
            <h2 className="mt-4 font-display text-4xl leading-tight md:text-6xl text-paper">
              Ready to Find Your Perfect Door?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-sm text-paper/80 leading-relaxed">
              Connect directly with our dedicated technical team for custom dimensions, pricing quotes, or WhatsApp enquiries.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link
              href="/#contact"
              className="bg-[#E65100] text-paper px-9 py-4.5 text-xs uppercase tracking-[0.25em] font-semibold transition-all hover:bg-[#d44800] rounded shadow-lg"
            >
              Contact Us
            </Link>
            <a
              href="https://wa.me/9187232751"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-paper px-8 py-4.5 text-xs uppercase tracking-[0.25em] font-semibold transition-all hover:bg-[#1ebd59] rounded shadow-lg cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
              <span>WhatsApp Us</span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}