"use client";

import { useEnquiry, EnquiryItem } from "@/context/EnquiryContext";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { getAssetUrl } from "@/lib/assets";

function EnquiryItemCard({ item }: { item: EnquiryItem }) {
  const { updateItem, removeItemById } = useEnquiry();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col border-b border-line/60 pb-4 pt-3 group">
      <div className="flex items-start gap-4">
        {/* Door Thumbnail */}
        <div className="relative h-20 w-14 flex-shrink-0 overflow-hidden bg-cream border border-line rounded-sm">
          <Image
            src={getAssetUrl(item.image)}
            alt={item.code}
            fill
            sizes="56px"
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] uppercase tracking-[0.15em] text-gold font-medium truncate">
              {item.category}
            </span>
            <button
              onClick={() => removeItemById(item.id)}
              className="text-ink-soft hover:text-oxblood transition-colors p-1 cursor-pointer shrink-0"
              title="Remove item"
              aria-label={`Remove ${item.code}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <p className="font-display text-lg text-ink leading-tight">{item.code}</p>

          {/* Specs Summary */}
          {!isEditing && (
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-ink-soft">
              <span>Qty: {item.quantity}</span>
              <span>·</span>
              <span>{item.width} × {item.length} ft</span>
              <span>·</span>
              <span>{item.thickness} mm</span>
            </div>
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
              className="flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] text-gold hover:text-gold/80 font-medium cursor-pointer border border-gold/40 hover:border-gold px-2.5 py-1 rounded transition-colors bg-gold/5"
            >
              <span>{isEditing ? "Done" : "Edit Specs"}</span>
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
                type="text"
                value={item.width}
                onChange={(e) => updateItem(item.id, { width: e.target.value })}
                className="w-full border border-line bg-paper px-2 py-1 text-xs text-ink rounded outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-[0.15em] text-ink-soft block mb-1">Length (ft)</label>
              <input
                type="text"
                value={item.length}
                onChange={(e) => updateItem(item.id, { length: e.target.value })}
                className="w-full border border-line bg-paper px-2 py-1 text-xs text-ink rounded outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-[0.15em] text-ink-soft block mb-1">Thickness (mm)</label>
              <input
                type="text"
                value={item.thickness}
                onChange={(e) => updateItem(item.id, { thickness: e.target.value })}
                className="w-full border border-line bg-paper px-2 py-1 text-xs text-ink rounded outline-none focus:border-gold"
              />
            </div>
          </div>
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
  const [userEmail, setUserEmail] = useState("");
  const [userLocation, setUserLocation] = useState("");

  const handleWhatsAppClick = () => {
    if (items.length === 0) return;
    setIsUserFormOpen(true);
  };

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;

    const phoneNumber = "919108840102"; // Eco Shine phone with 91 country code

    // User details text
    let userDetailsText = `Name: ${userName.trim()}\n`;
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
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-gold text-paper py-4 text-center text-xs uppercase tracking-[0.25em] font-medium transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98] shadow-md cursor-pointer"
                  >
                    Send Enquiry via WhatsApp
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

      {/* User Details Modal Popup before WhatsApp redirect */}
      {isUserFormOpen && (
        <div
          onClick={() => setIsUserFormOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 px-4 backdrop-blur-sm"
        >
          <form
            onSubmit={handleSubmitDetails}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-paper p-6 border border-line shadow-2xl rounded-md text-ink"
          >
            <h4 className="font-display text-2xl border-b border-line pb-3">Your Details</h4>
            <p className="text-xs text-ink-soft mt-2 leading-relaxed">
              Please enter your details before sending the enquiry to WhatsApp.
            </p>

            <div className="mt-5 flex flex-col gap-4">
              {/* Name Input */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-ink-soft block mb-1.5 font-medium">
                  Name <span className="text-oxblood">*</span>
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. John Doe"
                  required
                  className="w-full border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-ink-soft block mb-1.5 font-medium">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="e.g. john@example.com"
                  className="w-full border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </div>

              {/* Location Input */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] text-ink-soft block mb-1.5 font-medium">
                  Location (Optional)
                </label>
                <input
                  type="text"
                  value={userLocation}
                  onChange={(e) => setUserLocation(e.target.value)}
                  placeholder="e.g. Chikkamagaluru"
                  className="w-full border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => setIsUserFormOpen(false)}
                className="flex-1 border border-ink/20 py-3 text-center text-[10px] uppercase tracking-[0.2em] hover:bg-ink/5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-gold text-paper py-3 text-center text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-gold/90 cursor-pointer"
              >
                Submit &amp; Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
