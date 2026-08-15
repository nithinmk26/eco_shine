"use client";

import Reveal from "@/components/Reveal";

const features = [
  {
    title: "100% Seasoned Timber",
    description: "Built using chemically treated seasoned wood matched to international standards for zero warping and maximum life.",
    code: "01",
  },
  {
    title: "Precision Engineering",
    description: "State-of-the-art CNC routing, high-density HMR cores, and seamless laminate edge sealing.",
    code: "02",
  },
  {
    title: "Custom Size Engineering",
    description: "Custom width (2.25 to 4.5 ft), length (6.25 to 10 ft), and thickness (25 to 60 mm) tailored to customer requirements.",
    code: "03",
  },
  {
    title: "Eco-Conscious Standards",
    description: "Sustainably sourced materials manufactured to conserve the environmental ecosystem.",
    code: "04",
  },
];

export default function WhyEcoShine() {
  return (
    <section id="why-eco-shine" className="border-t border-line bg-ink py-28 text-paper">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-12 items-center">
          <Reveal className="lg:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#E65100] font-bold">
              Brand Philosophy
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-6xl">
              Built on seasoned wood. Kept with seasoned word.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-paper/80">
              At Eco Shine Doors &amp; Windows, every door is crafted to unite structural durability with refined interior aesthetics. Our devoted professional team delivers quality and precision across every project.
            </p>
          </Reveal>

          <div className="lg:col-span-7 grid gap-6 sm:grid-cols-2">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08} className="bg-paper/5 border border-paper/15 p-6 rounded-lg backdrop-blur-sm">
                <span className="font-display text-2xl text-[#E65100] block mb-2">{f.code}</span>
                <h3 className="font-display text-xl text-paper leading-snug">{f.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-paper/75">{f.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
