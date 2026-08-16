export type HamberCategory = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  hero: string;
  href: string;
  isExternal: boolean;
  badge: string;
  stats: string;
};

export const hamberCategories: HamberCategory[] = [
  {
    id: "flush-wood-laminated-doors",
    slug: "flush-wood-laminated-doors",
    title: "Flush Wood Laminated Doors",
    subtitle: "Eco Shine · 2026 Edition Index",
    tagline: "25 specialized door collections featuring luxury veneer, gold patti, gubbi, membrane & WPC designs.",
    hero: "/doors/luxur-veneer-door/hero.webp",
    href: "/catalogue",
    isExternal: false,
    badge: "25 Collections",
    stats: "500+ Door Designs",
  },
  {
    id: "upvc-windows-doors",
    slug: "upvc-windows-doors",
    title: "UPVC Windows & Doors",
    subtitle: "Vagmine uPVC Solutions",
    tagline: "High-performance, soundproof, energy-efficient and weatherproof sliding and casement window & door systems.",
    hero: "/doors/upvc-windows-doors/hero.webp",
    href: "https://photos.app.goo.gl/VcsjmwSJSbcmuukWA",
    isExternal: true,
    badge: "Google Photos Album",
    stats: "Full Photo Gallery ↗",
  },
  {
    id: "wpc-frames-doors",
    slug: "wpc-frames-doors",
    title: "WPC Frames & Doors",
    subtitle: "Eco Shine WPC Solutions",
    tagline: "100% waterproof, fire-retardant and termite-proof Wood Polymer Composite door frames and solid doors.",
    hero: "/doors/wpc-frames-doors/hero.webp",
    href: "https://photos.app.goo.gl/1D5gyY8ZGHgrtLUt5",
    isExternal: true,
    badge: "Google Photos Album",
    stats: "Full Photo Gallery ↗",
  },
];
