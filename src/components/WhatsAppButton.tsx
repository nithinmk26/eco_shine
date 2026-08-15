"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const PRODUCTS = [
  { id: "flush-wood", label: "Flush Wood Laminated Doors" },
  { id: "upvc", label: "UPVC Windows and Doors" },
  { id: "wpc", label: "WPC Frames and Doors" },
];

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([
    "Flush Wood Laminated Doors",
    "UPVC Windows and Doors",
    "WPC Frames and Doors",
  ]);

  const phoneNumber = "9187232751"; // Eco Shine Enquiry

  const email = "ecoshinedoorsandwindows@gmail.com";
  const emailSubject = "Inquiry Regarding Doors & Windows Products - Eco Shine";
  const emailBody = `Hello Eco Shine Team,\n\nI would like to inquire about your doors and windows products. Could you please share detailed product information and pricing?\n\nThanks!`;
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const toggleProduct = (label: string) => {
    if (selectedProducts.includes(label)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== label));
    } else {
      setSelectedProducts([...selectedProducts, label]);
    }
  };

  const handleContinueToWhatsApp = () => {
    let messageList = "";
    if (selectedProducts.length > 0) {
      messageList = selectedProducts.map((p) => `• ${p}`).join("\n");
    } else {
      messageList = "• General Products Inquiry";
    }

    const whatsappMessage = `Hello Eco Shine, I would like to inquire about the following products:\n\n${messageList}\n\nPlease share details and catalogue information. Thanks!`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Buttons Container */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3 pointer-events-none">
        {/* Email Icon Button */}
        <motion.a
          href={mailtoUrl}
          initial={{ scale: 0, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Email Eco Shine"
          title="Email Eco Shine"
          className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold text-paper shadow-xl transition-all hover:bg-gold/90 hover:shadow-2xl focus:outline-none cursor-pointer border border-paper/20"
        >
          <svg className="h-5 w-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </motion.a>

        {/* Instagram Icon Button */}
        <motion.a
          href="https://www.instagram.com/ecoshinedoorsand?igsh=MWMwb2Jubjl3a291dA=="
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.7 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Visit Eco Shine on Instagram"
          title="Instagram Eco Shine"
          className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-xl transition-all hover:opacity-95 hover:shadow-2xl focus:outline-none cursor-pointer"
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </motion.a>

        {/* WhatsApp Icon Button (Triggers Modal) */}
        <motion.button
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.8 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Chat with Eco Shine on WhatsApp"
          title="WhatsApp Eco Shine"
          className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all hover:bg-[#20ba5a] hover:shadow-2xl focus:outline-none cursor-pointer"
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </motion.button>
      </div>

      {/* Checkbox Popup Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl bg-paper p-6 shadow-2xl border border-line"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-ink-soft hover:text-ink transition-colors p-1 cursor-pointer"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 border-b border-line pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-xl text-ink leading-snug">WhatsApp Product Enquiry</h3>
                  <p className="text-xs text-ink-soft">Select products to include in your message</p>
                </div>
              </div>

              {/* Checkboxes List */}
              <div className="mt-5 space-y-3">
                {PRODUCTS.map((prod) => {
                  const isChecked = selectedProducts.includes(prod.label);
                  return (
                    <label
                      key={prod.id}
                      onClick={() => toggleProduct(prod.label)}
                      className={`flex items-center justify-between rounded-xl border p-3.5 cursor-pointer transition-all duration-200 ${
                        isChecked
                          ? "border-[#25D366] bg-[#25D366]/10 text-ink"
                          : "border-line bg-cream/30 text-ink-soft hover:bg-cream/60"
                      }`}
                    >
                      <span className="text-sm font-semibold">{prod.label}</span>
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                          isChecked ? "bg-[#25D366] border-[#25D366] text-white" : "border-line bg-paper"
                        }`}
                      >
                        {isChecked && (
                          <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Action Button */}
              <div className="mt-6">
                <button
                  onClick={handleContinueToWhatsApp}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-[#20ba5a] hover:shadow-xl cursor-pointer"
                >
                  <span>Continue to WhatsApp</span>
                  <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
