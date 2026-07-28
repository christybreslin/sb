import type { Metadata } from "next";
import HeroOptions from "@/components/HeroOptions";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hero options | Studio Borne",
  robots: { index: false, follow: false },
};

export default function HeroOptionsPage() {
  return (
    <>
      <main>
        <HeroOptions />
      </main>
      <Footer />
    </>
  );
}
