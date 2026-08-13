"use client";

import Image from "next/image";
import { useState } from "react";
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [width, setWidth] = useState("3.25");
  const [length, setLength] = useState("7.0");
  const [thickness, setThickness] = useState("30");
  const [quantity, setQuantity] = useState(1);

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWidth("3.25");
    setLength("7.0");
    setThickness("30");
    setQuantity(1);
    setIsModalOpen(true);
  };

  const handleConfirm = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      code,
      image,
      category,
      width,
      length,
      thickness,
      quantity,
    });
    setIsModalOpen(false);
    setIsOpen(true);
  };

  return (
    <>
      <motion.figure
        initial={reduce ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.65, ease: EASE_OUT, delay: (index % 3) * 0.08 }}
        whileHover={reduce ? undefined : { y: -6, transition: { type: "spring", stiffness: 300, damping: 22 } }}
        className="group cursor-pointer"
        onClick={handleOpenModal}
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
            onClick={handleOpenModal}
            className="absolute bottom-4 left-4 right-4 py-2.5 text-center text-[10px] uppercase tracking-[0.2em] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 shadow-md cursor-pointer bg-gold text-paper hover:bg-gold/90 z-30 font-medium"
          >
            Add to Enquiry
          </button>
        </div>
        <figcaption className="flex items-baseline justify-between pt-3">
          <span className="font-display text-lg tracking-wide">{code}</span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">7 × 3.25 ft</span>
        </figcaption>
      </motion.figure>

      {/* Customize details modal popup */}
      {isModalOpen && (
        <div 
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 px-4 backdrop-blur-sm"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-paper p-6 border border-line shadow-2xl rounded-md text-ink"
          >
            <h4 className="font-display text-2xl border-b border-line pb-3">Customize Enquiry</h4>
            <p className="text-[10px] uppercase tracking-[0.15em] text-gold mt-2 font-medium">
              {category} · {code}
            </p>
            
            <div className="mt-5 flex flex-col gap-4">
              {/* Width Input */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-ink-soft block mb-1.5 font-medium">Width</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="e.g. 3.25"
                    className="w-full border border-line bg-paper pl-3 pr-10 py-2 text-sm outline-none focus:border-gold"
                  />
                  <span className="absolute right-3 text-xs text-ink-soft select-none pointer-events-none font-sans">
                    ft
                  </span>
                </div>
              </div>
              
              {/* Length Input */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-ink-soft block mb-1.5 font-medium">Length</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="e.g. 7.0"
                    className="w-full border border-line bg-paper pl-3 pr-10 py-2 text-sm outline-none focus:border-gold"
                  />
                  <span className="absolute right-3 text-xs text-ink-soft select-none pointer-events-none font-sans">
                    ft
                  </span>
                </div>
              </div>

              {/* Thickness Input */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-ink-soft block mb-1.5 font-medium">Thickness</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={thickness}
                    onChange={(e) => setThickness(e.target.value)}
                    placeholder="e.g. 30"
                    className="w-full border border-line bg-paper pl-3 pr-12 py-2 text-sm outline-none focus:border-gold"
                  />
                  <span className="absolute right-3 text-xs text-ink-soft select-none pointer-events-none font-sans">
                    mm
                  </span>
                </div>
              </div>
              
              {/* Quantity Input */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-ink-soft block mb-1.5 font-medium">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-9 w-9 items-center justify-center border border-line bg-cream text-lg font-medium hover:bg-line/45 active:scale-95 cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 h-9 border border-line bg-paper py-1 text-center text-sm outline-none focus:border-gold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-9 w-9 items-center justify-center border border-line bg-cream text-lg font-medium hover:bg-line/45 active:scale-95 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 border border-ink/20 py-3 text-center text-[10px] uppercase tracking-[0.2em] hover:bg-ink/5"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 bg-gold text-paper py-3 text-center text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-gold/90"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}