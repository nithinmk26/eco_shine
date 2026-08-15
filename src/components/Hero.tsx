"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import { getAssetUrl } from "@/lib/assets";

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
          src={getAssetUrl(image)}
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
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
          className="text-[11px] uppercase tracking-[0.4em] text-[#E65100] font-bold drop-shadow-sm"
        >
          Eco Shine · New Edition 2026
        </motion.p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.35 }}
          className="mt-3 font-display text-5xl leading-[1.02] tracking-tight md:text-7xl lg:text-8xl max-w-4xl"
        >
          Doors Designed for Modern Living
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.55 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-paper/90"
        >
          Premium doors combining design, durability and everyday performance. Built from 100% seasoned timber.
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6"
        >
          <a
            href="#collections"
            className="bg-[#E65100] px-8 py-4 text-xs uppercase tracking-[0.25em] text-paper transition-all duration-200 ease-out hover:bg-[#d44800] hover:-translate-y-0.5 active:scale-[0.98] font-semibold shadow-lg rounded"
          >
            Explore Doors
          </a>

          <Link
            href="/catalogue"
            className="flex items-center gap-2 border border-paper/40 bg-ink/30 backdrop-blur-sm px-8 py-4 text-xs uppercase tracking-[0.25em] text-paper transition-all duration-200 ease-out hover:border-paper hover:bg-paper/10 hover:-translate-y-0.5 active:scale-[0.98] font-medium rounded"
          >
            <span>View Catalogue</span>
            <svg className="w-3.5 h-3.5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}