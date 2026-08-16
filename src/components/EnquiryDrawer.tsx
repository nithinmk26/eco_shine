"use client";

import { useEnquiry, EnquiryItem } from "@/context/EnquiryContext";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { getAssetUrl } from "@/lib/assets";
import { validateDimensions } from "@/lib/validation";
import { sendGAEvent } from "@/lib/gtag";

function EnquiryItemCard({ item }: { item: EnquiryItem }) {
  const { updateItem, removeItemById } = useEnquiry();
  const [isEditing, setIsEditing] = useState(false);

  const validation = validateDimensions(item.width, item.length, item.thickness);

  return (
    <div className="flex flex-col border-b border-line/60 pb-4 pt-3 group">
      <div className="flex items-start gap-4">
        {/* Door Image Thumbnail */}
        <div className="relative h-20 w-10 flex-shrink-0 overflow-hidden bg-cream border border-line rounded p-0.5">
          <Image
            src={getAssetUrl(item.image)}
            alt={item.code}
            fill
            sizes="40px"
            className="object-contain"
          />
        </div>

        {/* Item Info & Quick Details */}
        <div className="flex flex-col flex-grow min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-medium truncate">
              {item.category}
            </span>
            <button
              onClick={() => removeItemById(item.id)}
              className="text-ink-soft hover:text-oxblood transition-colors cursor-pointer text-xs font-semibold p-1 -mr-1"
              aria-label="Remove item"
              title="Remove door from enquiry"
            >
              &times; Remove
            </button>
          </div>

          <h4 className="font-display text-lg tracking-wide text-ink truncate">{item.code}</h4>

          {/* Current Specs Summary */}
          {!isEditing && (
            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-ink-soft">
              <span>Qty: {item.quantity}</span>
              <span>·</span>
              <span className={!validation.isWidthValid || !validation.isLengthValid ? "text-oxblood font-semibold" : ""}>
                {item.width} × {item.length} ft
              </span>
              <span>·</span>
              <span className={!validation.isThicknessValid ? "text-oxblood font-semibold" : ""}>
                {item.thickness} mm
              </span>
            </div>
          )}

          {!validation.isValid && !isEditing && (
            <span className="text-[10px] text-oxblood font-semibold mt-1 block">
              ⚠️ Size Not Available! Click Edit Specs to adjust.
            </span>
          )}

          {/* Quantity Controls & Edit Toggle Button */}
          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="flex items-center border border-line rounded bg-cream overflow-hidden">
              <button
                type="button"
                onClick={() => updateItem(item.id, { quantity: Math.max(1, item.quantity - 1) })}
                className="px-2 py-0.5 text-xs text-ink-soft hover:text-ink hover:bg-line/45 transition-colors cursor-pointer font-bold"
              >
                -
              </button>
              <span className="px-2.5 py-0.5 text-xs font-medium text-ink min-w-[24px] text-center font-mono">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => updateItem(item.id, { quantity: item.quantity + 1 })}
                className="px-2 py-0.5 text-xs text-ink-soft hover:text-ink hover:bg-line/45 transition-colors cursor-pointer font-bold"
              >
                +
              </button>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] font-medium cursor-pointer border px-2.5 py-1 rounded transition-colors ${!validation.isValid
                  ? "border-oxblood text-oxblood bg-oxblood/10 hover:bg-oxblood/20"
                  : "border-gold/40 text-gold hover:text-gold/80 hover:border-gold bg-gold/5"
                }`}
            >
              <span>{isEditing ? "Done" : !validation.isValid ? "Fix Specs" : "Edit Specs"}</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={isEditing ? "M5 13l4 4L19 7" : "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Inline Specs Editor inside Sidebar Card */}
      {isEditing && (
        <div className="mt-3 bg-cream/70 p-3 rounded border border-line/80 flex flex-col gap-2.5">
          <p className="text-[10px] uppercase tracking-[0.15em] font-medium text-gold">Customize Dimensions &amp; Thickness</p>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[9px] uppercase tracking-[0.15em] text-ink-soft block mb-1">Width (ft)</label>
              <input
                type="number"
                step="0.05"
                value={item.width}
                onChange={(e) => updateItem(item.id, { width: e.target.value })}
                className={`w-full border px-2 py-1 text-xs text-ink rounded outline-none ${!validation.isWidthValid ? "border-oxblood bg-oxblood/5 text-oxblood" : "border-line bg-paper focus:border-gold"
                  }`}
              />
              {!validation.isWidthValid && (
                <span className="text-[8px] text-oxblood font-semibold block mt-0.5">2.25-4.5ft</span>
              )}
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-[0.15em] text-ink-soft block mb-1">Length (ft)</label>
              <input
                type="number"
                step="0.05"
                value={item.length}
                onChange={(e) => updateItem(item.id, { length: e.target.value })}
                className={`w-full border px-2 py-1 text-xs text-ink rounded outline-none ${!validation.isLengthValid ? "border-oxblood bg-oxblood/5 text-oxblood" : "border-line bg-paper focus:border-gold"
                  }`}
              />
              {!validation.isLengthValid && (
                <span className="text-[8px] text-oxblood font-semibold block mt-0.5">6.25-10ft</span>
              )}
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-[0.15em] text-ink-soft block mb-1">Thickness (mm)</label>
              <input
                type="number"
                step="1"
                value={item.thickness}
                onChange={(e) => updateItem(item.id, { thickness: e.target.value })}
                className={`w-full border px-2 py-1 text-xs text-ink rounded outline-none ${!validation.isThicknessValid ? "border-oxblood bg-oxblood/5 text-oxblood" : "border-line bg-paper focus:border-gold"
                  }`}
              />
              {!validation.isThicknessValid && (
                <span className="text-[8px] text-oxblood font-semibold block mt-0.5">25-60mm</span>
              )}
            </div>
          </div>

          {!validation.isValid && (
            <div className="p-2 bg-oxblood/10 border border-oxblood/30 rounded text-oxblood text-[10px] font-medium">
              ⚠️ {validation.errorMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function EnquiryDrawer() {
  const { items, isOpen, setIsOpen, clearAll } = useEnquiry();

  // User details form state
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userLocation, setUserLocation] = useState("");

  const hasInvalidItem = items.some(
    (item) => !validateDimensions(item.width, item.length, item.thickness).isValid
  );

  const handleWhatsAppClick = () => {
    if (items.length === 0) return;
    if (hasInvalidItem) return;
    sendGAEvent("contact_form_start", {
      form_name: "Enquiry Drawer List Form",
      page_location: typeof window !== "undefined" ? window.location.pathname : "/",
    });
    setIsUserFormOpen(true);
  };

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userPhone.trim()) return;

    // Send non-PII conversion events to GA4
    sendGAEvent("generate_lead", {
      form_name: "Enquiry Drawer Lead Form",
      item_count: items.length,
      page_location: typeof window !== "undefined" ? window.location.pathname : "/",
    });

    sendGAEvent("click_whatsapp", {
      button_label: "Enquiry Drawer WhatsApp Submit",
      item_count: items.length,
      page_location: typeof window !== "undefined" ? window.location.pathname : "/",
    });

    const phoneNumber = "9187232751"; // Eco Shine WhatsApp Enquiry number

    // User details text
    let userDetailsText = `Name: ${userName.trim()}\n`;
    userDetailsText += `Contact No: ${userPhone.trim()}\n`;
    if (userEmail.trim()) {
      userDetailsText += `Email: ${userEmail.trim()}\n`;
    }
    if (userLocation.trim()) {
      userDetailsText += `Location: ${userLocation.trim()}\n`;
    }

    // Items list text
    const itemsListText = items
      .map(
        (item, index) =>
          `${index + 1}. ${item.category} - Code: ${item.code} (Qty: ${item.quantity}, Size: ${item.width} ft x ${item.length} ft, Thickness: ${item.thickness} mm)`
      )
      .join("\n");

    const message = `Hello Eco Shine,\n\nI would like to enquire about the following doors from your catalogue:\n\nCustomer Details:\n${userDetailsText}\nEnquiry Items:\n${itemsListText}\n\nPlease share the details and pricing. Thanks!`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
    setIsUserFormOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-ink"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col bg-paper shadow-2xl border-l border-line"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-line px-6 py-5">
                <div>
                  <h3 className="font-display text-2xl">Enquiry List</h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ink-soft mt-0.5">
                    {items.length} {items.length === 1 ? "item" : "items"} selected
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-2xl text-ink-soft hover:text-ink transition-colors p-1 cursor-pointer"
                  aria-label="Close drawer"
                >
                  &times;
                </button>
              </div>

              {/* Scrollable list */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center text-ink-soft">
                    <p className="font-display text-lg">Your list is empty</p>
                    <p className="mt-2 text-xs max-w-[200px] leading-relaxed">
                      Click &quot;Add to Enquiry&quot; on any door card in the catalogue to build your list.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {items.map((item) => (
                      <EnquiryItemCard key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              {items.length > 0 && (
                <div className="border-t border-line bg-cream px-6 py-6 flex flex-col gap-3">
                  {hasInvalidItem && (
                    <div className="p-3 bg-oxblood/10 border border-oxblood/30 rounded text-oxblood text-xs font-semibold">
                      ⚠️ Some items have dimensions that are Not Available. Please fix specs above before sending.
                    </div>
                  )}
                  <button
                    onClick={handleWhatsAppClick}
                    disabled={hasInvalidItem}
                    className={`w-full py-4 text-center text-xs uppercase tracking-[0.25em] font-medium transition-all shadow-md cursor-pointer ${hasInvalidItem
                        ? "bg-oxblood/80 text-paper opacity-60 cursor-not-allowed"
                        : "bg-gold text-paper hover:bg-gold/90"
                      }`}
                  >
                    {hasInvalidItem ? "Fix Invalid Sizes Above" : "Send Enquiry via WhatsApp"}
                  </button>
                  <button
                    onClick={clearAll}
                    className="w-full border border-ink/20 text-ink py-3 text-center text-[10px] uppercase tracking-[0.2em] transition-colors hover:bg-ink/5 cursor-pointer"
                  >
                    Clear List
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Full-Page / Whole Page Customer Details Modal Popup */}
      {isUserFormOpen && (
        <div
          onClick={() => setIsUserFormOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/75 px-4 backdrop-blur-md"
        >
          <form
            onSubmit={handleSubmitDetails}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-paper p-6 sm:p-8 border border-line shadow-2xl rounded-lg text-ink max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h4 className="font-display text-2xl">Complete Your Enquiry</h4>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold mt-1 font-medium">
                  {items.length} {items.length === 1 ? "door selected" : "doors selected"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsUserFormOpen(false)}
                className="text-2xl text-ink-soft hover:text-ink transition-colors cursor-pointer"
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            {/* Selected items overview */}
            <div className="mt-4 bg-cream/70 p-3.5 rounded border border-line/80">
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-ink-soft mb-2">Enquiry Summary</p>
              <div className="flex flex-col gap-1.5 max-h-32 overflow-y-auto text-xs text-ink pr-1">
                {items.map((it, idx) => (
                  <div key={it.id} className="flex justify-between items-center border-b border-line/40 pb-1">
                    <span className="truncate font-medium">{idx + 1}. {it.code} ({it.category})</span>
                    <span className="text-[11px] text-ink-soft shrink-0 ml-2">Qty {it.quantity} · {it.width}×{it.length}ft</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              {/* Name Input */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-ink-soft block mb-1.5 font-medium">
                  Full Name <span className="text-oxblood">*</span>
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  required
                  className="w-full border border-line bg-paper px-3.5 py-2.5 text-sm outline-none focus:border-gold rounded"
                />
              </div>

              {/* Contact Number Input (Mandatory) */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-ink-soft block mb-1.5 font-medium">
                  Contact Number <span className="text-oxblood">*</span>
                </label>
                <input
                  type="tel"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  required
                  className="w-full border border-line bg-paper px-3.5 py-2.5 text-sm outline-none focus:border-gold rounded"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-ink-soft block mb-1.5 font-medium">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="e.g. rahul@example.com"
                  className="w-full border border-line bg-paper px-3.5 py-2.5 text-sm outline-none focus:border-gold rounded"
                />
              </div>

              {/* Location Input */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-ink-soft block mb-1.5 font-medium">
                  City / Location (Optional)
                </label>
                <input
                  type="text"
                  value={userLocation}
                  onChange={(e) => setUserLocation(e.target.value)}
                  placeholder="e.g. Bangalore / Chikkamagaluru"
                  className="w-full border border-line bg-paper px-3.5 py-2.5 text-sm outline-none focus:border-gold rounded"
                />
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => setIsUserFormOpen(false)}
                className="flex-1 border border-ink/20 py-3.5 text-center text-[10px] uppercase tracking-[0.2em] hover:bg-ink/5 cursor-pointer rounded"
              >
                Back to List
              </button>
              <button
                type="submit"
                className="flex-1 bg-gold text-paper py-3.5 text-center text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-gold/90 cursor-pointer rounded shadow-md"
              >
                Send to WhatsApp &rarr;
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
