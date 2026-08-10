export type Door = {
  code: string;
  image: string;
};

export type Category = {
  slug: string;
  name: string;
  /** Page number in the printed 2026 edition index */
  indexPage: number;
  tagline?: string;
  /** Lifestyle opener image for the category, if the edition has one */
  hero?: string;
  doors: Door[];
};