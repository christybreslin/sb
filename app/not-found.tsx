import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found" };

/* Shown for any address that isn't a page, in the Say hello page's manner. */
export default function NotFound() {
  return (
    <main className="lost">
      <p className="lost-cap">Page not found</p>
      <h1>
        Sorry, we can’t find that page<i className="lost-dot" />
      </h1>
      <p className="lost-links">
        <Link href="/">The studio</Link>
        <span aria-hidden="true">·</span>
        <Link href="/feed">The feed</Link>
        <span aria-hidden="true">·</span>
        <Link href="/contact">Say hello</Link>
      </p>
    </main>
  );
}
