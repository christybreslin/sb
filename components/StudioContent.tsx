import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import StudioIndex from "@/components/StudioIndex";
import logos from "@/lib/clients-data.json";
import { photo, type Photo } from "@/lib/gallery";

const chapters = [
  { id: "who", label: "Who we are" },
  { id: "work", label: "What we do" },
  { id: "clients", label: "Clients" },
  { id: "why", label: "Why it works" },
];

/* Logos come from scripts/make-client-logos.py; `height` is how tall each is
   shown, in the line's own units, chosen by eye so they carry equal weight.
   Clients without a logo file yet are set in type. */
const clients: { name: string; logo?: keyof typeof logos; height?: number }[] = [
  { name: "Queen Rose" },
  { name: "Eldon London", logo: "eldon-london", height: 3 },
  { name: "L\u2019H\u00f4tel Marrakech", logo: "lhotel-marrakech", height: 2.9 },
  { name: "Villa Mabrouka", logo: "villa-mabrouka", height: 6.4 },
  { name: "Harriet and Hera" },
  { name: "Salsa Rose", logo: "salsa-rose", height: 1.15 },
  { name: "London Velvet", logo: "london-velvet", height: 1.15 },
];

const services = [
  "Competitor and audience analysis",
  "Content guidance and creative direction",
  "Social media planning and scheduling",
  "Marketing support and fresh campaign concepts",
  "Performance tracking through key KPIs",
  "Ongoing content optimisation based on results",
  "Meta ad management",
];

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
    <main className="px-(--gutter) pt-28 text-brown md:pt-44 md:pr-[7.5vw] md:pl-[7.5vw] lg:pr-[17vw]">
      <h1 className="sr-only">The studio</h1>
      <StudioIndex items={chapters} />

      {/* Opening: one line to the left of a photograph, then the introduction
          beneath it. */}
      <section id="who" aria-labelledby="who-title" className="scroll-mt-4">
        <div className="grid items-center gap-y-8 md:grid-cols-12 md:gap-x-(--gutter)">
          <p data-reveal="text" className="studio-lead max-w-[17ch] md:col-span-4">
            Great content isn&rsquo;t enough on its own. Neither is a strong social
            strategy.
          </p>
          <Shot
            photo={photo("dsc00175")}
            sizes="(min-width: 768px) 30vw, 100vw"
            preload
            className="md:col-span-4 md:col-start-5"
          />
        </div>
        <div className="grid pt-10 md:grid-cols-12 md:gap-x-(--gutter) md:pt-14">
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

      <Chapter id="work" title="What we do" photo={photo("vm27171")} photoFirst>
        <h3>Content creation</h3>
        <p>
          Compelling, on-brand content and a versatile library we continuously draw
          from, repurpose and optimise.
        </p>
        <h3>Social media management</h3>
        <p>
          Beyond just posting: strategic scheduling and audience-first content, timed
          for maximum impact.
        </p>
        <details className="studio-more">
          <summary>What that includes</summary>
          <ul>
            {services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </details>
      </Chapter>

      {/* The clients, passing slowly in a single line. The second copy is only
          there so the line can loop without a gap. */}
      <section
        id="clients"
        aria-labelledby="clients-title"
        className="scroll-mt-4 pt-24 md:pt-[20vh]"
      >
        <div data-reveal="text" className="studio-text">
          <h2 id="clients-title">Clients</h2>
        </div>
        <div data-reveal="photo" className="clients mt-6 md:mt-8">
          <div className="clients-track">
            {[false, true].map((copy) => (
              <ul key={String(copy)} aria-hidden={copy || undefined}>
                {clients.map((c) => {
                  const logo = c.logo && logos[c.logo];
                  return (
                    <li key={c.name}>
                      {logo ? (
                        <Image
                          src={logo.src}
                          alt={c.name}
                          width={logo.width}
                          height={logo.height}
                          sizes="20rem"
                          style={{ height: `${c.height}em` }}
                          className="w-auto max-w-none"
                        />
                      ) : (
                        c.name
                      )}
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
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
          photo={photo("vb20937-edit")}
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
