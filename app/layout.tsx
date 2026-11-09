import type { Metadata } from "next";
import { Figtree, Noto_Serif_Display } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PointerEffects from "@/components/PointerEffects";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

const notoSerif = Noto_Serif_Display({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-noto-serif",
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
    <html lang="en-GB" className={`${figtree.variable} ${notoSerif.variable}`}>
      <body>
        {/* The thin line drawn just inside the edge of every page. */}
        <div className="page-frame">
          <Nav />
          {children}
          <Footer />
        </div>
        <PointerEffects />
      </body>
    </html>
  );
}
