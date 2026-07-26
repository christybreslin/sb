import type { Metadata } from "next";
import { Archivo, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
});

export const metadata: Metadata = {
  title: "Studio Borne | Social Media Strategy & Content Creation, London",
  description:
    "Studio Borne is a London-based social media strategy and content creation agency. Fresh content, uniquely tailored to your brand, designed to show off your product the way it truly deserves.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${hanken.variable}`}>
      <head>
        {/* No-JS / pre-hydration fallback: keep reveal content visible if
            framer-motion never runs, so the page is never a blank canvas. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important;}`}</style>
        </noscript>
      </head>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
