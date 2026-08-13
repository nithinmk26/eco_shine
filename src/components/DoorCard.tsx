"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";
import { getAssetUrl } from "@/lib/assets";
import { useEnquiry } from "@/context/EnquiryContext";

type DoorCardProps = {
  code: string;
  image: string;
  category: string;
  index: number;
};

export default function DoorCard({ code, image, category, index }: DoorCardProps) {
  const reduce = useReducedMotion();
  const { addItem, getItemCount, setIsOpen } = useEnquiry();
  const count = getItemCount(code);
  const isAdded = count > 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAdded) {
      addItem({
        code,
        image,
        category,
        width: "3.25",
        length: "7.0",
        thickness: "30",
        quantity: 1,
      });
    }
    setIsOpen(true);
  };

  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.65, ease: EASE_OUT, delay: (index % 3) * 0.08 }}
      whileHover={reduce ? undefined : { y: -6, transition: { type: "spring", stiffness: 300, damping: 22 } }}
      className="group cursor-pointer"
      onClick={handleAddToCart}
    >
      <div
        className={`relative aspect-[3/4] overflow-hidden bg-cream transition-all duration-300 ${
          isAdded ? "ring-4 ring-gold ring-offset-2 ring-offset-paper" : ""
        }`}
      >
        <Image
          src={getAssetUrl(image)}
          alt={`${category} door, code ${code}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
        />
        {/* Hover overlay mask */}
        <div className="absolute inset-0 bg-ink/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Added Badge */}
        {isAdded && (
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-paper text-xs shadow-lg border border-paper font-medium">
            <span>✓ In Cart</span>
            {count > 1 && <span className="rounded-full bg-paper text-gold px-1.5 py-0.2 text-[10px] font-bold">{count}</span>}
          </div>
        )}

        {/* Action Button - Always Available */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 left-4 right-4 py-2.5 text-center text-[10px] uppercase tracking-[0.2em] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 shadow-md cursor-pointer bg-gold text-paper hover:bg-gold/90 z-30 font-medium"
        >
          {isAdded ? "Edit Details in Sidebar" : "Add to Enquiry"}
        </button>
      </div>
      <figcaption className="flex items-baseline justify-between pt-3">
        <span className="font-display text-lg tracking-wide">{code}</span>
        <span className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">7 × 3.25 ft</span>
      </figcaption>
    </motion.figure>
  );
}