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
  return {
    title: `${c.name} · Eco Shine Doors & Windows`,
    description: `${c.name} from the Eco Shine New Edition 2026: ${c.doors.length} doors with product codes, size 7 × 3.25 ft.`,
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

  return (
    <>
      <CategoryHero image={heroImage} name={category.name} indexPage={category.indexPage} />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-6">
          <p className="text-sm text-ink-soft">
            {category.doors.length} doors · Size 7 × 3.25 ft
            {category.tagline ? <span className="italic"> · {category.tagline}</span> : null}
          </p>
          <p className="text-[11px] uppercase tracking-[0.25em] text-ink-soft">
            Edition 2026 · Page {category.indexPage}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 xl:grid-cols-4">
          {category.doors.map((door, i) => (
            <DoorCard key={door.code} code={door.code} image={door.image} category={category.name} index={i} />
          ))}
        </div>
      </section>

      <nav className="mx-auto grid max-w-7xl gap-px border-y border-line bg-line px-0 md:grid-cols-2">
        {prev ? (
          <Link
            href={`/catalogue/${prev.slug}`}
            className="group bg-paper px-6 py-10 transition-colors duration-300 hover:bg-cream"
          >
            <span className="text-[11px] uppercase tracking-[0.3em] text-ink-soft">← Previous</span>
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
            <span className="text-[11px] uppercase tracking-[0.3em] text-ink-soft">Next →</span>
            <span className="mt-2 block font-display text-2xl transition-transform duration-300 ease-out group-hover:translate-x-1 md:text-3xl">
              {next.name}
            </span>
          </Link>
        ) : (
          <Link href="/catalogue" className="group bg-paper px-6 py-10 text-right transition-colors duration-300 hover:bg-cream">
            <span className="text-[11px] uppercase tracking-[0.3em] text-ink-soft">Back to</span>
            <span className="mt-2 block font-display text-2xl md:text-3xl">Full Index</span>
          </Link>
        )}
      </nav>
    </>
  );
}