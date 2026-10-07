import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PointerEffects from "@/components/PointerEffects";

const instrument = Instrument_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  title: {
    default: "Studio Borne | Content creation and social media strategy, London",
    template: "%s | Studio Borne",
  },
  description:
    "Studio Borne is a London-based social media strategy and content creation agency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={instrument.variable}>
      <body>
        <Nav />
        {children}
        <Footer />
        <PointerEffects />
      </body>
    </html>
  );
}
