"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";
import { getAssetUrl } from "@/lib/assets";
import { useEnquiry } from "@/context/EnquiryContext";
import { validateDimensions } from "@/lib/validation";
import { sendGAEvent } from "@/lib/gtag";

type DoorCardProps = {
  code: string;
  image: string;
  category: string;
  index: number;
};

export default function DoorCard({ code, image, category, index }: DoorCardProps) {
  const reduce = useReducedMotion();
  const { addItem, getItemCount } = useEnquiry();
  const count = getItemCount(code);
  const isAdded = count > 0;

  const [isSpecsModalOpen, setIsSpecsModalOpen] = useState(false);
  const [width, setWidth] = useState("3.25");
  const [length, setLength] = useState("7.0");
  const [thickness, setThickness] = useState("30");
  const [quantity, setQuantity] = useState(1);
  const [hasSubmittedAttempt, setHasSubmittedAttempt] = useState(false);

  const validation = validateDimensions(width, length, thickness);

  const handleOpenSpecsModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    sendGAEvent("view_product", { door_code: code, collection_name: category });
    setWidth("3.25");
    setLength("7.0");
    setThickness("30");
    setQuantity(1);
    setHasSubmittedAttempt(false);
    setIsSpecsModalOpen(true);
  };

  const handleConfirmSpecs = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setHasSubmittedAttempt(true);

    if (!validation.isValid) {
      return;
    }

    addItem({
      code,
      image,
      category,
      width: width.trim() || "3.25",
      length: length.trim() || "7.0",
      thickness: thickness.trim() || "30",
      quantity: Math.max(1, quantity),
    });
    setIsSpecsModalOpen(false);
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
        onClick={handleOpenSpecsModal}
      >
        <div
          className={`relative aspect-[1/2] overflow-hidden bg-cream/70 transition-all duration-300 ${isAdded ? "ring-4 ring-gold ring-offset-2 ring-offset-paper" : ""
            }`}
        >
          <Image
            src={getAssetUrl(image)}
            alt={`Eco Shine ${category} Door - Model ${code}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-2 transition-transform duration-300 ease-out"
          />
          {/* Hover overlay mask */}
          <div className="absolute inset-0 bg-ink/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Added Badge */}
          {isAdded && (
            <div className="absolute top-3 right-3 z-20 flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-paper text-xs shadow-lg border border-paper font-medium">
              <span>✓ In Cart</span>
              {count > 1 && <span className="rounded-full bg-paper text-gold px-1.5 py-0.2 text-[10px] font-bold">{count}</span>}
            </div>
          )}

          {/* Action Button - Pops specs modal */}
          <button
            onClick={handleOpenSpecsModal}
            className="absolute bottom-4 left-4 right-4 py-2.5 text-center text-[10px] uppercase tracking-[0.2em] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 shadow-md cursor-pointer bg-gold text-paper hover:bg-gold/90 z-30 font-medium"
          >
            {isAdded ? `Add More (${count} in enquiry)` : "Add to Enquiry"}
          </button>
        </div>
        <figcaption className="flex items-baseline justify-between pt-3">
          <span className="font-display text-lg tracking-wide">{code}</span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-ink-soft">7 × 3.25 ft</span>
        </figcaption>
      </motion.figure>

      {/* Specs Customization Popup Modal */}
      {isSpecsModalOpen && (
        <div
          onClick={() => setIsSpecsModalOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/70 px-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-paper p-6 sm:p-7 border border-line shadow-2xl rounded-lg text-ink"
          >
            {/* Header: Image Thumbnail + Code + Quantity */}
            <div className="flex items-start justify-between gap-4 border-b border-line/60 pb-5">
              <div className="flex items-center gap-3.5">
                <div className="relative h-20 w-10 flex-shrink-0 overflow-hidden bg-cream border border-line rounded p-0.5">
                  <Image
                    src={getAssetUrl(image)}
                    alt={`Eco Shine ${category} Door - Model ${code}`}
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-gold font-medium block">
                    {category}
                  </span>
                  <h4 className="font-display text-2xl text-ink leading-tight">{code}</h4>
                </div>
              </div>

              {/* Quantity selector */}
              <div className="flex items-center border border-line rounded bg-cream overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2.5 py-1 text-sm font-bold text-ink-soft hover:text-ink hover:bg-line/45 transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-semibold text-ink min-w-[24px] text-center font-mono">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2.5 py-1 text-sm font-bold text-ink-soft hover:text-ink hover:bg-line/45 transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Customize Dimensions & Thickness Form Box */}
            <div className="mt-5 bg-cream/70 p-4 rounded-lg border border-line/80">
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gold mb-3">
                CUSTOMIZE DIMENSIONS &amp; THICKNESS
              </p>

              <div className="grid grid-cols-3 gap-3">
                {/* Width */}
                <div>
                  <label className="text-[9px] uppercase tracking-[0.18em] text-ink-soft block mb-1.5 font-medium">
                    WIDTH (FT)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="3.25"
                    className={`w-full border px-3 py-2 text-sm text-ink rounded outline-none font-medium transition-colors ${!validation.isWidthValid
                        ? "border-oxblood bg-oxblood/5 text-oxblood focus:border-oxblood"
                        : "border-line bg-paper focus:border-gold"
                      }`}
                  />
                  {!validation.isWidthValid && (
                    <span className="text-[9px] text-oxblood font-semibold block mt-1 leading-tight">
                      Not available (2.25 - 4.5 ft)
                    </span>
                  )}
                </div>

                {/* Length */}
                <div>
                  <label className="text-[9px] uppercase tracking-[0.18em] text-ink-soft block mb-1.5 font-medium">
                    LENGTH (FT)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="7.0"
                    className={`w-full border px-3 py-2 text-sm text-ink rounded outline-none font-medium transition-colors ${!validation.isLengthValid
                        ? "border-oxblood bg-oxblood/5 text-oxblood focus:border-oxblood"
                        : "border-line bg-paper focus:border-gold"
                      }`}
                  />
                  {!validation.isLengthValid && (
                    <span className="text-[9px] text-oxblood font-semibold block mt-1 leading-tight">
                      Not available (6.25 - 10 ft)
                    </span>
                  )}
                </div>

                {/* Thickness */}
                <div>
                  <label className="text-[9px] uppercase tracking-[0.18em] text-ink-soft block mb-1.5 font-medium">
                    THICKNESS (MM)
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={thickness}
                    onChange={(e) => setThickness(e.target.value)}
                    placeholder="30"
                    className={`w-full border px-3 py-2 text-sm text-ink rounded outline-none font-medium transition-colors ${!validation.isThicknessValid
                        ? "border-oxblood bg-oxblood/5 text-oxblood focus:border-oxblood"
                        : "border-line bg-paper focus:border-gold"
                      }`}
                  />
                  {!validation.isThicknessValid && (
                    <span className="text-[9px] text-oxblood font-semibold block mt-1 leading-tight">
                      Not available (25 - 60 mm)
                    </span>
                  )}
                </div>
              </div>

              {/* Red Error Banner Notification if size is out of bounds */}
              {(!validation.isValid || hasSubmittedAttempt) && !validation.isValid && (
                <div className="mt-3.5 p-3 bg-oxblood/10 border border-oxblood/40 rounded text-oxblood text-xs flex items-start gap-2">
                  <svg className="w-4 h-4 text-oxblood shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <span className="font-bold block uppercase tracking-wider text-[10px]">
                      SIZE NOT AVAILABLE
                    </span>
                    <span className="text-[11px] leading-snug block mt-0.5">
                      {validation.errorMessage}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Actions: Cancel & Done Button */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsSpecsModalOpen(false)}
                className="px-5 py-2.5 border border-ink/20 rounded text-[10px] uppercase tracking-[0.2em] text-ink hover:bg-ink/5 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSpecs}
                disabled={!validation.isValid}
                className={`flex items-center gap-1.5 px-6 py-2.5 rounded text-[11px] uppercase tracking-[0.2em] font-semibold transition-all shadow-md cursor-pointer border ${validation.isValid
                    ? "bg-gold text-paper border-gold hover:bg-gold/90"
                    : "bg-oxblood/80 text-paper border-oxblood opacity-60 cursor-not-allowed"
                  }`}
              >
                <span>{validation.isValid ? "DONE" : "NOT AVAILABLE"}</span>
                {validation.isValid && (
                  <svg className="w-3.5 h-3.5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}