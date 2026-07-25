import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/who", label: "Who" },
  { href: "/what", label: "What" },
  { href: "/why", label: "Why" },
  { href: "/feed", label: "The Feed" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 py-10 sm:flex-row sm:justify-between sm:px-8">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Image
            src="/logo.png"
            alt="Studio Borne — content creation & social media strategy"
            width={1391}
            height={1400}
            className="h-16 w-auto"
          />
        </Link>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[0.6rem] font-bold tracking-[0.24em] text-paper/60 uppercase transition-colors hover:text-sand"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <p className="text-[0.6rem] font-bold tracking-[0.2em] text-paper/40 uppercase">
          &copy; {new Date().getFullYear()} Studio Borne &mdash; London
        </p>
      </div>
    </footer>
  );
}
