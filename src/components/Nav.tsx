"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useEnquiry } from "@/context/EnquiryContext";

const links = [
  { href: "/catalogue", label: "Catalogue" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], ["rgba(250,247,242,0)", "rgba(250,247,242,0.95)"]);
  const line = useTransform(scrollY, [0, 120], ["rgba(229,221,208,0)", "rgba(229,221,208,1)"]);
  const { items, setIsOpen } = useEnquiry();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      style={{ backgroundColor: bg, borderColor: line }}
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 gap-2">
        {/* Logo & Brand Name */}
        <Link href="/" className="group flex items-center gap-2.5 sm:gap-3 shrink-0 min-w-0">
          <img
            src="/logo/eco_shine_logo.jpeg"
            alt="Eco Shine Logo"
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover border border-line shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-display text-base sm:text-lg tracking-wide leading-none truncate text-ink">
              Eco Shine
            </span>
            <span className="mt-0.5 text-[8px] sm:text-[9px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-gold leading-none truncate font-medium">
              Add Shine To Your Home
            </span>
          </div>
        </Link>

        {/* Desktop Links & Action */}
        <div className="flex items-center gap-4 sm:gap-8">
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-xs uppercase tracking-[0.25em] transition-colors duration-200 hover:text-gold ${
                  pathname === l.href ? "text-gold" : "text-ink"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Enquiry Cart Trigger Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-ink hover:text-gold transition-colors duration-200 cursor-pointer bg-cream/60 sm:bg-transparent px-2.5 sm:px-0 py-1.5 sm:py-0 rounded border sm:border-0 border-line"
          >
            <span>Enquiry</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[9px] font-sans font-semibold text-paper group-hover:bg-ink group-hover:text-paper transition-colors duration-200">
              {items.length}
            </span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-ink hover:text-gold transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-t border-line bg-paper/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4 shadow-lg overflow-hidden"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-xs uppercase tracking-[0.25em] py-1 transition-colors ${
                  pathname === l.href ? "text-gold font-medium" : "text-ink"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}