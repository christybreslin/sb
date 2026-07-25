import type { Metadata } from "next";
import Why from "@/components/Why";
import NextStop from "@/components/NextStop";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Why us — Studio Borne",
};

export default function WhyPage() {
  return (
    <>
      <main className="pt-16">
        <Why />
        <NextStop href="/feed" label={"The\nfeed"} />
      </main>
      <Footer />
    </>
  );
}
