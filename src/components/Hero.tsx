"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

export default function Hero({ image }: { image: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 160]);
  const imgScale = useTransform(scrollY, [0, 800], [1, reduce ? 1 : 1.12]);
  const textY = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -80]);
  const textOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative flex min-h-svh items-end overflow-hidden bg-cream">
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
        <Image
          src={image}
          alt="Arched hallway with an Eco Shine luxury veneer door"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/20" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-40 text-paper"
      >
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.35 }}
          className="font-display text-6xl leading-[0.95] tracking-tight md:text-8xl"
        >
          Shine on
          <br />
          the Doors
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.55 }}
          className="mt-6 max-w-md text-sm leading-relaxed text-paper/85"
        >
          The Eco Shine catalogue, New Edition 2026. A door that speaks style, and lives strength.
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6"
        >
          <Link
            href="/catalogue"
            className="bg-gold px-8 py-4 text-xs uppercase tracking-[0.3em] text-paper transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98] font-medium shadow-md"
          >
            Browse the catalogue
          </Link>

          <a
            href="/Eco_Shine_Catalogue_2026.pdf"
            download="Eco_Shine_Catalogue_2026.pdf"
            className="flex items-center gap-2.5 border border-paper/40 bg-ink/30 backdrop-blur-sm px-7 py-4 text-xs uppercase tracking-[0.25em] text-paper transition-all duration-200 ease-out hover:border-gold hover:bg-gold hover:text-paper hover:-translate-y-0.5 active:scale-[0.98] font-medium cursor-pointer"
          >
            <svg className="h-4 w-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download Brochure (PDF)</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}