import type { Metadata } from "next";

export const metadata: Metadata = { title: "Say hello" };

export default function Contact() {
  return (
    <main className="flex min-h-[calc(100svh-8rem)] flex-col justify-center px-(--gutter) pt-28">
      <h1 className="page-in max-w-[40ch] text-lg">
        Tell us about your brand and we&rsquo;ll show you what fresh, intentional
        content can do for it.
      </h1>
      <a
        href="mailto:hello@studioborne.co"
        className="email-link page-in mt-6 self-start text-[clamp(1.7rem,6.6vw,6rem)] leading-none font-medium tracking-[-0.04em] text-red"
      >
        hello@studioborne.co
      </a>
    </main>
  );
}
