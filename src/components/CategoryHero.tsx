"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { EASE_OUT } from "@/lib/motion";
import { getAssetUrl } from "@/lib/assets";

type CategoryHeroProps = {
  image?: string;
  name: string;
  indexPage: number;
};

export default function CategoryHero({ image, name, indexPage }: CategoryHeroProps) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 120]);
  const titleY = useTransform(scrollY, [0, 500], [0, reduce ? 0 : -60]);

  return (
    <section className="relative flex min-h-[70svh] items-end overflow-hidden bg-ink">
      {image && (
        <motion.div style={{ y: imgY }} className="absolute inset-0">
          <Image
            src={getAssetUrl(image)}
            alt={`Eco Shine ${name} Collection Hero`}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/10" />
        </motion.div>
      )}
      <motion.div style={{ y: titleY }} className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-48 text-paper">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.15 }}
          className="text-[11px] uppercase tracking-[0.4em] text-gold-light font-semibold drop-shadow-md"
        >
          Page {indexPage} · Edition 2026
        </motion.p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE_OUT, delay: 0.3 }}
          className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] tracking-tight md:text-7xl"
        >
          {name}
        </motion.h1>
      </motion.div>
    </section>
  );
}