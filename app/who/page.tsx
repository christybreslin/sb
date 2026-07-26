import type { Metadata } from "next";
import Who from "@/components/Who";
import NextStop from "@/components/NextStop";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Who we are | Studio Borne",
};

export default function WhoPage() {
  return (
    <>
      <main className="pt-16">
        <Who />
        <NextStop href="/what" label={"What\nwe do"} />
      </main>
      <Footer />
    </>
  );
}
