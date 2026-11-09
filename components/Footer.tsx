"use client";

import { usePathname } from "next/navigation";
import { EMAIL } from "@/lib/studio";

/* Only the Feed uses this; home and Say hello end with their own footers. */
export default function Footer() {
  if (usePathname() !== "/feed") return null;

  return (
    <footer className="flex items-baseline justify-between gap-6 px-(--gutter) pt-24 pb-8 text-sm md:pt-32">
      <p>Studio Borne, London</p>
      <a href={`mailto:${EMAIL}`} className="link-draw transition-colors duration-300 hover:text-brick">
        {EMAIL}
      </a>
    </footer>
  );
}
