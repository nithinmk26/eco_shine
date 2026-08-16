import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found · Eco Shine Doors & Windows",
  description: "The page you are looking for could not be found on Eco Shine Doors & Windows.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-32 text-center bg-cream/50">
      <p className="text-[11px] uppercase tracking-[0.4em] text-[#E65100] font-bold">
        Error 404
      </p>
      <h1 className="mt-4 font-display text-5xl md:text-7xl text-ink tracking-tight">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-sm text-ink-soft leading-relaxed">
        The door you are looking for might have been moved or does not exist. Explore our catalogue or return to the main entrance.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="bg-[#0B2545] text-paper px-8 py-3.5 text-xs uppercase tracking-[0.25em] font-semibold transition-all hover:bg-[#E65100] rounded shadow-md"
        >
          Return Home
        </Link>
        <Link
          href="/catalogue"
          className="border border-ink/40 bg-paper px-8 py-3.5 text-xs uppercase tracking-[0.25em] text-ink transition-all hover:border-[#E65100] hover:text-[#E65100] font-semibold rounded shadow-sm"
        >
          Browse Catalogue
        </Link>
        <Link
          href="/about"
          className="border border-ink/40 bg-paper px-8 py-3.5 text-xs uppercase tracking-[0.25em] text-ink transition-all hover:border-[#E65100] hover:text-[#E65100] font-semibold rounded shadow-sm"
        >
          About Us
        </Link>
      </div>
    </div>
  );
}
