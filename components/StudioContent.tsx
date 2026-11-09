import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Clients from "@/components/Clients";
import StudioIndex from "@/components/StudioIndex";
import { photo, type Photo } from "@/lib/gallery";

const chapters = [
  { id: "who", label: "Who we are" },
  { id: "work", label: "What we do" },
  { id: "clients", label: "Clients" },
  { id: "why", label: "Why it works" },
];

const services = [
  "Social media strategy, planning and scheduling",
  "Professional photography and videography",
  "iPhone content creation",
  "Campaign strategy, planning and production",
  "Social media copywriting",
  "Competitor and audience analysis",
  "Performance tracking and monthly reporting",
];

/* The wide photograph that opens the page, cropped to a letterbox. */
const opening = photo("vb20937-edit");

/* A whole, uncropped photograph. The frame is what gets placed on the page;
   the inner wrapper is what the motion styles act on. */
function Shot({
  photo: p,
  sizes,
  preload = false,
  className = "",
}: {
  photo: Photo;
  sizes: string;
  preload?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <div data-reveal="photo" data-magnet="0.04">
        <Image
          src={p.src}
          alt={p.alt}
          width={p.width}
          height={p.height}
          sizes={sizes}
          placeholder="blur"
          blurDataURL={p.blurDataURL}
          preload={preload}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}

/* A passage of text and one photograph, on opposite sides of the page. Each
   holds its place near the top of the screen while the taller one scrolls by. */
function Chapter({
  id,
  title,
  photo: p,
  photoFirst = false,
  children,
}: {
  id: string;
  title: string;
  photo: Photo;
  photoFirst?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="grid scroll-mt-4 items-start gap-y-8 pt-24 md:grid-cols-12 md:gap-x-(--gutter) md:pt-[20vh]"
    >
      <div
        data-reveal="text"
        className={`studio-text max-w-[27rem] md:sticky md:top-28 md:col-span-5 ${
          photoFirst ? "md:order-2 md:col-start-8" : ""
        }`}
      >
        <h2 id={`${id}-title`}>{title}</h2>
        {children}
      </div>
      <Shot
        photo={p}
        sizes="(min-width: 768px) 40vw, 100vw"
        className={`md:sticky md:top-28 ${
          photoFirst ? "md:order-1 md:col-span-6 md:col-start-1" : "md:col-span-5 md:col-start-7"
        }`}
      />
    </section>
  );
}

export default function StudioContent() {
  return (
    <main id="studio" className="px-(--gutter) pt-28 text-brown md:pt-44 md:pr-[7.5vw] md:pl-[7.5vw] lg:pr-[17vw]">
      <h1 className="sr-only">The studio</h1>
      <StudioIndex items={chapters} />

      {/* Opening: one wide photograph, the line that sums up the studio
          beneath it, then the introduction. */}
      <section id="who" aria-labelledby="who-title" className="scroll-mt-4">
        <div data-reveal="photo" data-magnet="0.02" className="relative aspect-[16/8.5] overflow-hidden">
          <Image
            src={opening.src}
            alt={opening.alt}
            fill
            sizes="(min-width: 1024px) 75vw, (min-width: 768px) 85vw, 100vw"
            placeholder="blur"
            blurDataURL={opening.blurDataURL}
            preload
            className="object-cover object-top"
          />
        </div>
        <p
          data-reveal="text"
          className="pt-10 text-[clamp(1.6rem,3.2vw,2.75rem)] leading-[1.1] tracking-[-0.01em] uppercase md:pt-12 md:pl-[4vw]"
        >
          Content creation and social media strategy, all under one roof.
        </p>
        <div className="grid pt-20 md:grid-cols-12 md:gap-x-(--gutter) md:pt-28">
          <div data-reveal="text" className="studio-text md:col-span-4 md:col-start-5">
            <h2 id="who-title">Who we are</h2>
            <p>
              Studio Borne is a London-based social media strategy and content creation
              agency.
            </p>
            <p>
              We make fresh content, tailored to your brand and designed to show off
              your product or service the way it deserves.
            </p>
            <p>Success lives where content and strategy meet, so we do both.</p>
          </div>
        </div>
      </section>

      {/* What we do: the two halves of the work either side of a pair of
          portraits, then the full list of services, folded away. */}
      <section id="work" aria-labelledby="work-title" className="scroll-mt-4 pt-24 md:pt-[20vh]">
        <div data-reveal="text" className="studio-text">
          <h2 id="work-title">What we do</h2>
        </div>
        <div className="grid items-start gap-y-10 pt-8 md:grid-cols-12 md:gap-x-(--gutter) md:pt-10">
          <div data-reveal="text" className="studio-text studio-work md:col-span-3">
            <h3>Content creation</h3>
            <p>
              We produce professional photography, videography and iPhone content, with
              every shoot planned from concept to delivery. Working closely with you, we
              consider past performance, upcoming campaigns and seasonal opportunities to
              develop tailored shoot plans. Each shoot is guided by your brand&rsquo;s
              visual identity, ensuring a cohesive aesthetic while building a versatile
              library of imagery and video for ongoing use.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-(--gutter) md:col-span-5">
            <Shot photo={photo("eldon-headscarf-bw")} sizes="(min-width: 768px) 20vw, 50vw" />
            <Shot photo={photo("eldondsc07360")} sizes="(min-width: 768px) 20vw, 50vw" />
          </div>
          <div data-reveal="text" className="studio-text studio-work md:col-span-4">
            <h3>Social media management</h3>
            <p>
              Social media is one of your brand&rsquo;s most powerful marketing tools,
              acting as your digital shop window. It&rsquo;s where potential customers
              discover who you are, what you do and what you stand for.
            </p>
            <p>
              From planning and scheduling to day-to-day management, we ensure a
              consistent flow of engaging posts designed to connect with your audience and
              encourage organic growth. We bring your story to life through a carefully
              curated grid, creating a distinctive online presence that reflects your
              identity. Through ongoing performance analysis, we continually refine our
              approach to build on what works.
            </p>
          </div>
        </div>
        <details className="studio-more studio-text mx-auto mt-16 max-w-[37.5rem] md:mt-20">
          <summary>What our services include</summary>
          <p className="studio-more-intro">
            We offer a range of tailored retainer packages, designed around your
            brand&rsquo;s individual needs. Our services include:
          </p>
          <ul>
            {services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </details>
      </section>

      {/* The clients, passing slowly in a single line that can also be
          scrolled sideways by hand. */}
      <section
        id="clients"
        aria-labelledby="clients-title"
        className="scroll-mt-4 pt-24 md:pt-[20vh]"
      >
        <div data-reveal="text" className="studio-text">
          <h2 id="clients-title">Clients</h2>
        </div>
        <div data-reveal="photo" className="mt-6 md:mt-8">
          <Clients />
        </div>
      </section>

      <Chapter id="why" title="Why it works" photo={photo("dsc06171")}>
        <h3>Two pillars, one team</h3>
        <p>
          Social media strategy and content creation live under one roof, so nothing
          falls through the gap between them.
        </p>
        <h3>Complementary strengths</h3>
        <p>
          Honor brings a strategic edge from launching her own business and leading
          in-house marketing. Ellie brings creative depth from years shooting for
          leading brands.
        </p>
        <h3>Content with intent</h3>
        <p>
          To gain real traction, content has to align with strategy: timed, placed and
          delivered with intention to reach its full potential.
        </p>
      </Chapter>

      {/* Closing: one wide photograph running off the left edge of the page,
          then where to go next. */}
      <section className="pt-24 md:pt-[20vh]">
        <Shot
          photo={photo("dsc06224")}
          sizes="(min-width: 768px) 80vw, 100vw"
          className="md:-ml-[7.5vw]"
        />
        <div
          data-reveal="text"
          className="grid gap-y-6 pt-10 md:grid-cols-12 md:gap-x-(--gutter) md:pt-14"
        >
          <p className="studio-lead max-w-[24ch] md:col-span-6">
            Tell us about your brand and we&rsquo;ll show you what fresh, intentional
            content can do for it.
          </p>
          <p className="studio-text flex gap-8 md:col-span-5 md:col-start-8 md:pt-1">
            <Link href="/contact" className="link-sweep">
              Say hello
            </Link>
            <Link href="/feed" className="link-sweep">
              See The Feed
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
