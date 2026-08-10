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
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-40 text-paper"
      >
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.2 }}
          className="text-[11px] uppercase tracking-[0.4em] text-paper/80"
        >
          Eco Shine Doors &amp; Windows presents
        </motion.p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.35 }}
          className="mt-4 font-display text-6xl leading-[0.95] tracking-tight md:text-8xl"
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
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <Link
            href="/catalogue"
            className="bg-gold px-8 py-4 text-xs uppercase tracking-[0.3em] text-paper transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Browse the catalogue
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}