import type { Metadata } from "next";
import Hero, { type HeroVariant } from "@/components/Hero";

export const metadata: Metadata = {
  title: "Hero preview | Studio Borne",
  robots: { index: false, follow: false },
};

const variants: HeroVariant[] = [
  "original",
  "soft",
  "warm",
  "marks",
  "silk",
  "blobvid",
];

/*
 * The hero on its own, no nav and no footer, so /hero-options can embed it in an
 * iframe at real phone dimensions. CSS media queries respond to viewport width
 * rather than container width, so a scaled-down div could never show true mobile
 * framing. Only a real narrow viewport can.
 */
export default async function HeroPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>;
}) {
  const { variant } = await searchParams;
  const active = variants.includes(variant as HeroVariant)
    ? (variant as HeroVariant)
    : "original";

  return <Hero variant={active} />;
}
