"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";

const tabs = [
  { href: "/", label: "The studio" },
  { href: "/feed", label: "The feed" },
  { href: "/contact", label: "Say hello" },
];

/* The three tabs in small spaced capitals; the current page is underlined. */
export function NavLinks({ className }: { className?: string }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className={className}>
      {tabs.map((t) => (
        <Link key={t.href} href={t.href} aria-current={pathname === t.href ? "page" : undefined}>
          {t.label}
        </Link>
      ))}
    </nav>
  );
}

/* The header on every page but home, as on the Say hello board: the sb logo
   on the left leads home, the tabs on the right. The home page carries its
   own tabs in its opening screens. */
export default function Nav() {
  if (usePathname() === "/") return null;
  return (
    <header className="site-header">
      <Link href="/" aria-label="Studio Borne home" className="site-logo">
        <Logo />
      </Link>
      <NavLinks className="site-tabs" />
    </header>
  );
}
