import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { EnquiryProvider } from "@/context/EnquiryContext";
import EnquiryDrawer from "@/components/EnquiryDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";

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
  title: "Eco Shine Doors & Windows · Add Shine To Your Home",
  description:
    "Immersive digital catalogue of Eco Shine Doors and Windows - Add Shine To Your Home. Presenting the New Edition 2026: luxury veneer, laminated, membrane, WPC and primer coated doors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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