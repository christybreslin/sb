"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  /* The home page is a single still screen: nothing below the wordmark. */
  if (pathname === "/") return null;

  return (
    <footer className="flex items-baseline justify-between gap-6 px-(--gutter) pt-24 pb-5 text-sm md:pt-32">
      <p>Studio Borne, London</p>
      {pathname !== "/contact" && (
        <a href="mailto:hello@studioborne.co" className="link-draw transition-colors duration-300 hover:text-red">
          hello@studioborne.co
        </a>
      )}
    </footer>
  );
}
