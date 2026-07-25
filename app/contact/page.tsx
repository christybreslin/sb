import type { Metadata } from "next";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Say hello — Studio Borne",
};

export default function ContactPage() {
  return (
    <>
      <main className="pt-16">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
