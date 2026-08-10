import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-line bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="font-display text-3xl">Eco Shine</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-paper/60">Doors &amp; Windows</p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-paper/70">
            Presenting the Eco Shine catalogue, New Edition 2026. A door that speaks style, and lives strength.
          </p>
          <div className="mt-8 flex flex-col gap-2 text-sm text-paper/60">
            <p className="text-xs uppercase tracking-[0.25em] text-gold">Browse</p>
            <Link href="/catalogue" className="w-fit transition-colors hover:text-gold">
              Full catalogue index
            </Link>
            <Link href="/#about" className="w-fit transition-colors hover:text-gold">
              About Eco Shine
            </Link>
          </div>
        </div>
        
        <div className="lg:col-span-4">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Contact Us</p>
          <address className="mt-4 text-sm not-italic leading-relaxed text-paper/80">
            <span className="font-semibold text-paper">Eco Shine Doors &amp; Windows</span>
            <br />
            KM Rd, opposite to IDSG college,
            <br />
            Chikkamagaluru, Karnataka 577102
          </address>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <p className="text-paper/80">
              Phone:{" "}
              <a href="tel:9108840102" className="text-gold transition-colors hover:underline">
                9108840102
              </a>
            </p>
            <a
              href="https://maps.app.goo.gl/EeRK4c2BWp3TM7Ew6"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-xs uppercase tracking-[0.2em] text-gold hover:underline"
            >
              Get Directions &rarr;
            </a>
          </div>
        </div>

        <div className="lg:col-span-4 overflow-hidden rounded-md border border-paper/10 aspect-[4/3] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3882.2660771094297!2d75.79276377508273!3d13.333717787015889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbad9a768d02411%3A0x2d1dfd9d59544396!2sEcoshine%20Doors%20and%20Windows!5e0!3m2!1sen!2sin!4v1786382289467!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
      <div className="border-t border-paper/10 py-6 text-center text-[11px] uppercase tracking-[0.25em] text-paper/40">
        Eco Shine Doors &amp; Windows · New Edition 2026
      </div>
    </footer>
  );
}