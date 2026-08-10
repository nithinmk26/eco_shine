"use client";

import { useEnquiry } from "@/context/EnquiryContext";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState } from "react";

export default function EnquiryDrawer() {
  const { items, isOpen, setIsOpen, removeItemById, clearAll } = useEnquiry();

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
                  <div className="flex flex-col gap-4">
                    {items.map((item) => (
                      <div
                        key={item.code}
                        className="flex items-center gap-4 border-b border-line/40 pb-4"
                      >
                        <div className="relative h-16 w-12 overflow-hidden bg-cream border border-line">
                          <Image
                            src={item.image}
                            alt={item.code}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] uppercase tracking-[0.1em] text-gold font-medium">
                            {item.category}
                          </p>
                          <p className="font-display text-base text-ink mt-0.5">{item.code}</p>
                          <p className="text-[10px] text-ink-soft mt-1 leading-none font-sans">
                            Qty: {item.quantity} · Size: {item.width} ft × {item.length} ft · Thick: {item.thickness} mm
                          </p>
                        </div>
                        <button
                          onClick={() => removeItemById(item.id)}
                          className="text-xs uppercase tracking-[0.15em] text-ink-soft hover:text-oxblood transition-colors p-2 cursor-pointer"
                          aria-label="Remove item"
                        >
                          Remove
                        </button>
                      </div>
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
