import type { Metadata } from "next";
import Feed from "@/components/Feed";
import NextStop from "@/components/NextStop";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "The Feed | Studio Borne",
};

export default function FeedPage() {
  return (
    <>
      <main className="pt-16">
        <Feed />
        <NextStop href="/contact" label={"Say\nhello"} />
      </main>
      <Footer />
    </>
  );
}
