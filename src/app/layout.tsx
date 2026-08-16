import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { EnquiryProvider } from "@/context/EnquiryContext";
import EnquiryDrawer from "@/components/EnquiryDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";

const bodoni = localFont({
  variable: "--font-bodoni",
  src: [
    { path: "./fonts/bodoni-400.woff2", weight: "400" },
    { path: "./fonts/bodoni-500.woff2", weight: "500" },
    { path: "./fonts/bodoni-600.woff2", weight: "600" },
    { path: "./fonts/bodoni-700.woff2", weight: "700" },
  ],
});

const jost = localFont({
  variable: "--font-jost",
  src: [
    { path: "./fonts/jost-300.woff2", weight: "300" },
    { path: "./fonts/jost-400.woff2", weight: "400" },
    { path: "./fonts/jost-500.woff2", weight: "500" },
    { path: "./fonts/jost-600.woff2", weight: "600" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ecoshinedoors.in"),
  title: {
    default: "Eco Shine Doors & Windows · Add Shine To Your Home",
    template: "%s | Eco Shine Doors & Windows",
  },
  description:
    "Immersive digital catalogue of Eco Shine Doors and Windows - Add Shine To Your Home. Presenting the 2026 Edition: luxury veneer, laminated, membrane, WPC and primer coated doors.",
  keywords: [
    "Eco Shine Doors",
    "Eco Shine Doors and Windows",
    "WPC doors",
    "WPC doors Bangalore",
    "WPC doors Karnataka",
    "uPVC windows",
    "uPVC doors",
    "flush doors",
    "laminated flush doors",
    "luxury veneer doors",
    "membrane doors",
    "seasoned timber doors",
    "doors Chikkamagaluru",
  ],
  authors: [{ name: "Eco Shine Doors & Windows" }],
  creator: "Eco Shine Doors & Windows",
  publisher: "Eco Shine Doors & Windows",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ecoshinedoors.in",
    siteName: "Eco Shine Doors & Windows",
    title: "Eco Shine Doors & Windows · Add Shine To Your Home",
    description:
      "Explore Eco Shine New Edition 2026: 572+ premium door designs across 25 specialized collections. 100% seasoned wood, luxury veneer, WPC, and laminated doors.",
    images: [
      {
        url: "https://ecoshinedoors.in/doors/luxur-veneer-door/hero.webp",
        width: 1200,
        height: 630,
        alt: "Eco Shine Doors & Windows 2026 Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eco Shine Doors & Windows · Add Shine To Your Home",
    description:
      "572+ door designs across 25 collections: Luxury veneer, WPC membrane, laminated, and uPVC windows.",
    images: ["https://ecoshinedoors.in/doors/luxur-veneer-door/hero.webp"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://ecoshinedoors.in/#organization",
      "name": "Eco Shine Doors & Windows",
      "url": "https://ecoshinedoors.in",
      "logo": "https://ecoshinedoors.in/logo/eco_shine_logo.jpeg",
      "slogan": "Add Shine To Your Home",
      "description":
        "Supplier and manufacturer of premium doors, luxury veneer doors, WPC doors, laminated doors, and uPVC windows.",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9187232751",
        "contactType": "sales",
        "areaServed": "IN",
        "availableLanguage": ["en", "kn", "hi"],
      },
      "sameAs": ["https://www.instagram.com/ecoshinedoorsand"],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://ecoshinedoors.in/#localbusiness",
      "name": "Eco Shine Doors & Windows",
      "url": "https://ecoshinedoors.in",
      "logo": "https://ecoshinedoors.in/logo/eco_shine_logo.jpeg",
      "image": "https://ecoshinedoors.in/doors/luxur-veneer-door/hero.webp",
      "telephone": "+91-9187232751",
      "email": "ecoshinedoorsandwindows@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress":
          "No. 18741 Vishala Complex, Opp to IDSG college, KM Road, Jyoti Nagar",
        "addressLocality": "Chikkamagaluru",
        "addressRegion": "Karnataka",
        "postalCode": "577102",
        "addressCountry": "IN",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 13.333718,
        "longitude": 75.792764,
      },
      "hasMap": "https://maps.app.goo.gl/EeRK4c2BWp3TM7Ew6",
      "priceRange": "₹₹",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics 4 Scripts */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Root Organization & LocalBusiness JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className={`${bodoni.variable} ${jost.variable} antialiased`}>
        <EnquiryProvider>
          <SmoothScroll>
            <Nav />
            <main>{children}</main>
            <Footer />
            <EnquiryDrawer />
            <WhatsAppButton />
          </SmoothScroll>
        </EnquiryProvider>
      </body>
    </html>
  );
}