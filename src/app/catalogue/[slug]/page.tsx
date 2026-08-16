import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import DoorCard from "@/components/DoorCard";
import CategoryHero from "@/components/CategoryHero";
import { categories, getCategory } from "@/data/catalogue";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) return {};
  const heroImg = c.hero ?? c.doors[0]?.image ?? "/doors/luxur-veneer-door/hero.webp";
  const fullImageUrl = heroImg.startsWith("http") ? heroImg : `https://ecoshinedoors.in${heroImg}`;

  return {
    title: `${c.name} · Eco Shine Doors 2026 Collection`,
    description: `${c.name} from Eco Shine: ${c.doors.length} door models with custom dimensions, 100% seasoned timber, and durable finishes.`,
    alternates: {
      canonical: `https://ecoshinedoors.in/catalogue/${slug}`,
    },
    openGraph: {
      title: `${c.name} · Eco Shine Doors`,
      description: `${c.doors.length} door models in ${c.name} collection from Eco Shine Doors & Windows.`,
      url: `https://ecoshinedoors.in/catalogue/${slug}`,
      images: [fullImageUrl],
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const idx = categories.findIndex((c) => c.slug === slug);
  const prev = categories[idx - 1];
  const next = categories[idx + 1];
  const heroImage = category.hero ?? category.doors[0]?.image;

  // Other related collections
  const relatedCollections = categories.filter((c) => c.slug !== slug).slice(0, 3);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ecoshinedoors.in",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Catalogue",
        "item": "https://ecoshinedoors.in/catalogue",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": category.name,
        "item": `https://ecoshinedoors.in/catalogue/${slug}`,
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category.name} - Eco Shine Doors`,
    "url": `https://ecoshinedoors.in/catalogue/${slug}`,
    "description": `${category.name} collection from Eco Shine featuring ${category.doors.length} door models.`,
    "numberOfItems": category.doors.length,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <CategoryHero image={heroImage} name={category.name} indexPage={category.indexPage} />

      {/* Breadcrumbs Bar */}
      <div className="border-b border-line bg-cream/60 py-3.5 px-6">
        <div className="mx-auto max-w-7xl flex items-center gap-2 text-xs text-ink-soft">
          <Link href="/" className="hover:text-[#E65100] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/catalogue" className="hover:text-[#E65100] transition-colors">
            Catalogue
          </Link>
          <span>/</span>
          <span className="text-[#0B2545] font-semibold">{category.name}</span>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <Reveal className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-line pb-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#E65100] font-bold">Collection Overview</span>
            <h2 className="mt-1 font-display text-3xl md:text-4xl text-ink">{category.name}</h2>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">
            {category.doors.length} Door Models · Edition 2026 Page {category.indexPage}
          </p>
        </Reveal>

        {/* Product Door Cards Grid */}
        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-12 md:grid-cols-3 xl:grid-cols-4">
          {category.doors.map((door, i) => (
            <DoorCard key={door.code} code={door.code} image={door.image} category={category.name} index={i} />
          ))}
        </div>
      </section>

      {/* Related Collections Section */}
      <section className="border-t border-line bg-cream/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="flex items-center justify-between border-b border-line pb-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#E65100] font-bold">Discover More</p>
              <h3 className="mt-1 font-display text-2xl md:text-3xl text-ink">Related Collections</h3>
            </div>
            <Link
              href="/catalogue"
              className="text-xs uppercase tracking-[0.2em] font-semibold text-[#0B2545] hover:text-[#E65100] transition-colors"
            >
              View All Collections
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {relatedCollections.map((rc) => (
              <Link
                key={rc.slug}
                href={`/catalogue/${rc.slug}`}
                className="group bg-paper p-5 rounded-lg border border-line hover:border-gold hover:shadow-lg transition-all"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#E65100] font-bold block mb-1">
                  {rc.doors.length} Models
                </span>
                <h4 className="font-display text-xl text-ink group-hover:text-[#0B2545] transition-colors">{rc.name}</h4>
                <div className="mt-3 flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] text-[#0B2545] font-semibold group-hover:text-[#E65100]">
                  <span>Explore Collection</span>
                  <svg className="w-3.5 h-3.5 stroke-current fill-none transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Prev / Next Pagination */}
      <nav className="mx-auto grid max-w-7xl gap-px border-y border-line bg-line px-0 md:grid-cols-2">
        {prev ? (
          <Link
            href={`/catalogue/${prev.slug}`}
            className="group bg-paper px-6 py-10 transition-colors duration-300 hover:bg-cream"
          >
            <span className="text-[11px] uppercase tracking-[0.3em] text-ink-soft">← Previous Collection</span>
            <span className="mt-2 block font-display text-2xl transition-transform duration-300 ease-out group-hover:-translate-x-1 md:text-3xl">
              {prev.name}
            </span>
          </Link>
        ) : (
          <span className="bg-paper" />
        )}
        {next ? (
          <Link
            href={`/catalogue/${next.slug}`}
            className="group bg-paper px-6 py-10 text-right transition-colors duration-300 hover:bg-cream"
          >
            <span className="text-[11px] uppercase tracking-[0.3em] text-ink-soft">Next Collection →</span>
            <span className="mt-2 block font-display text-2xl transition-transform duration-300 ease-out group-hover:translate-x-1 md:text-3xl">
              {next.name}
            </span>
          </Link>
        ) : (
          <Link href="/catalogue" className="group bg-paper px-6 py-10 text-right transition-colors duration-300 hover:bg-cream">
            <span className="text-[11px] uppercase tracking-[0.3em] text-ink-soft">Index →</span>
            <span className="mt-2 block font-display text-2xl transition-transform duration-300 ease-out group-hover:translate-x-1 md:text-3xl">
              Full Catalogue Index
            </span>
          </Link>
        )}
      </nav>
    </>
  );
}