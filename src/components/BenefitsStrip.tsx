"use client";

import Reveal from "@/components/Reveal";

const benefits = [
  {
    title: "Durable Construction",
    description: "100% seasoned timber chemically treated to international durability standards.",
    icon: (
      <svg className="w-6 h-6 text-[#E65100]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Wide Design Range",
    description: "Over 570+ distinct door models across 25 specialized collections.",
    icon: (
      <svg className="w-6 h-6 text-[#E65100]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    title: "Low Maintenance",
    description: "Uniformly sanded protective finishes engineered for effortless cleaning.",
    icon: (
      <svg className="w-6 h-6 text-[#E65100]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: "Modern Designs",
    description: "Precision CNC routing, veneer, gold patti, laminated & 3D WPC finishes.",
    icon: (
      <svg className="w-6 h-6 text-[#E65100]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    title: "Quality Finishes",
    description: "SF & Matt finishes built for long-lasting structural strength.",
    icon: (
      <svg className="w-6 h-6 text-[#E65100]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    title: "Multiple Applications",
    description: "Tailored door solutions for villas, apartments, offices & hotels.",
    icon: (
      <svg className="w-6 h-6 text-[#E65100]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4m-4 0H9m5 0v10m-5-10v10" />
      </svg>
    ),
  },
];

export default function BenefitsStrip() {
  return (
    <section className="border-y border-line bg-cream/70 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.06} className="flex flex-col items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-paper border border-line shadow-xs">
                {b.icon}
              </div>
              <div>
                <h4 className="font-display text-sm font-semibold text-ink leading-tight">{b.title}</h4>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft">{b.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
