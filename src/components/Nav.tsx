"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { getAssetUrl } from "@/lib/assets";
import { useEnquiry } from "@/context/EnquiryContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#applications", label: "Applications" },
  { href: "/#why-eco-shine", label: "Why Eco Shine" },
  { href: "/#projects", label: "Projects" },
  { href: "/about", label: "About Us" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], ["rgba(250,247,242,0)", "rgba(250,247,242,0.95)"]);
  const line = useTransform(scrollY, [0, 120], ["rgba(229,221,208,0)", "rgba(229,221,208,1)"]);
  const { items, setIsOpen } = useEnquiry();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    if (href.includes("#")) {
      const targetId = href.split("#")[1];
      if (pathname === "/") {
        e.preventDefault();
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            window.history.pushState(null, "", `#${targetId}`);
          }
        }, 150);
      }
    }
  };

  return (
    <motion.header
      style={{ backgroundColor: bg, borderColor: line }}
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 gap-2">
        {/* Logo & Brand Name */}
        <Link href="/" className="group flex items-center gap-2.5 sm:gap-3 shrink-0 min-w-0">
          <Image
            src={getAssetUrl("/logo/eco_shine_logo.jpeg")}
            alt="Eco Shine Doors & Windows Logo"
            width={36}
            height={36}
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover border border-line shrink-0"
          />
          <div className="flex flex-col min-w-0 leading-none">
            <span className="font-sans font-black tracking-wider text-base sm:text-lg uppercase leading-none">
              <span className="text-[#0B2545]">ECO</span>{" "}
              <span className="text-[#E65100]">SHINE</span>
            </span>
            <span className="mt-1 text-[7.5px] sm:text-[8.5px] font-bold uppercase tracking-[0.15em] text-[#0B2545] leading-none">
              DOORS AND WINDOWS
            </span>
            <span className="mt-0.5 text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.14em] text-[#E65100] leading-none">
              ADD SHINE TO YOUR HOME
            </span>
          </div>
        </Link>

        {/* Desktop Links & Actions */}
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className={`text-[11px] uppercase tracking-[0.2em] transition-colors duration-200 hover:text-[#E65100] font-medium ${
                  pathname === l.href ? "text-[#E65100]" : "text-ink"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Enquiry Counter Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-ink hover:text-[#E65100] transition-colors duration-200 cursor-pointer bg-cream/80 px-2.5 py-1.5 rounded border border-line"
            title="View Enquiry Cart"
          >
            <span>Enquiry</span>
            <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#E65100] text-[9px] font-sans font-bold text-paper group-hover:bg-ink transition-colors duration-200">
              {items.length}
            </span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-ink hover:text-[#E65100] transition-colors cursor-pointer"
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
            className="lg:hidden border-t border-line bg-paper/95 backdrop-blur-md px-6 py-5 flex flex-col gap-3 shadow-lg overflow-hidden"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className={`text-xs uppercase tracking-[0.2em] py-1 transition-colors ${
                  pathname === l.href ? "text-[#E65100] font-semibold" : "text-ink"
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