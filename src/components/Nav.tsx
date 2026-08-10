"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "motion/react";
import { useEnquiry } from "@/context/EnquiryContext";

const links = [
  { href: "/catalogue", label: "Catalogue" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], ["rgba(250,247,242,0)", "rgba(250,247,242,0.9)"]);
  const line = useTransform(scrollY, [0, 120], ["rgba(229,221,208,0)", "rgba(229,221,208,1)"]);
  const { items, setIsOpen } = useEnquiry();

  return (
    <motion.header
      style={{ backgroundColor: bg, borderColor: line }}
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="group flex items-center gap-3">
          <img
            src="/logo/eco_shine_logo.jpeg"
            alt="Eco Shine Logo"
            className="h-9 w-9 rounded-full object-cover border border-line"
          />
          <div className="flex flex-col">
            <span className="font-display text-lg tracking-wide leading-none">Eco Shine</span>
            <span className="mt-1 text-[9px] uppercase tracking-[0.2em] text-ink-soft transition-colors group-hover:text-gold leading-none">
              Doors &amp; Windows
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-8">
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
          
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-ink hover:text-gold transition-colors duration-200 cursor-pointer"
          >
            <span>Enquiry</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[9px] font-sans font-semibold text-paper group-hover:bg-ink group-hover:text-paper transition-colors duration-200">
              {items.length}
            </span>
          </button>
        </div>
      </nav>
    </motion.header>
  );
}