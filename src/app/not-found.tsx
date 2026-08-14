import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col items-center justify-center px-6 text-center pt-24">
      <p className="text-[11px] uppercase tracking-[0.4em] text-gold font-semibold">404 · Page Not Found</p>
      <h1 className="mt-4 font-display text-4xl sm:text-6xl text-ink">Page Not Found</h1>
      <p className="mt-4 text-sm text-ink-soft max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 border border-ink bg-ink text-paper px-8 py-3.5 text-xs uppercase tracking-[0.25em] transition-all hover:bg-gold hover:border-gold font-medium rounded"
      >
        Return to Home
      </Link>
    </div>
  );
}
