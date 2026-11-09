import type { Metadata } from "next";
import { Figtree, Noto_Serif_Display } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PointerEffects from "@/components/PointerEffects";
import { SHARE } from "@/lib/studio";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

const notoSerif = Noto_Serif_Display({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-noto-serif",
});

const description =
  "Studio Borne is a London-based social media strategy and content creation agency working across the luxury and lifestyle sectors.";

export const metadata: Metadata = {
  /* Vercel supplies the production domain, so shared links point at whichever
     domain the site is live on. */
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3001",
  ),
  title: {
    default: "Studio Borne | Content creation and social media strategy, London",
    template: "%s | Studio Borne",
  },
  description,
  openGraph: {
    ...SHARE,
    title: "Studio Borne | Content creation and social media strategy, London",
    description,
  },
  twitter: { card: "summary_large_image" },
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
