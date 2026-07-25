import type { Metadata } from "next";
import What from "@/components/What";
import NextStop from "@/components/NextStop";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "What we do — Studio Borne",
};

export default function WhatPage() {
  return (
    <>
      <main className="pt-16">
        <What />
        <NextStop href="/why" label={"Why\nus?"} />
      </main>
      <Footer />
    </>
  );
}
