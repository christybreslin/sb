import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import "./home.css";
import Logo, { BALL, BALL_BOX, INK, LOGO_BOX } from "@/components/Logo";
import { NavLinks } from "@/components/Nav";
import Instagram from "@/components/Instagram";
import Strip from "@/components/Strip";
import StudioMotion from "@/components/StudioMotion";
import { clients, EMAIL, reel } from "@/lib/studio";

/* Built from the "The studio – home" board in "Studio Borne – website.html".
   The visitor lands on the logo, scrolls into the studio, and finishes on a
   choice between Say hello and The Feed. */

/* Where each letter of STUDIO sits in the stepped layout (x0, y0) and in the
   single line (x1, y1), in em, and how long it waits before moving. */
const letters: { ch: string; x0: string; y0: string; x1: string; y1: string; d: string }[] = [
  { ch: "S", x0: "1.31em", y0: "0em", x1: "0em", y1: ".74em", d: "0s" },
  { ch: "T", x0: "1.93em", y0: "0em", x1: "0.553em", y1: ".74em", d: "0.04s" },
  { ch: "U", x0: "0em", y0: ".74em", x1: "1.175em", y1: ".74em", d: "0.08s" },
  { ch: "D", x0: "0.64em", y0: ".74em", x1: "1.899em", y1: ".74em", d: "0.12s" },
  { ch: "I", x0: "1.4em", y0: ".74em", x1: "2.635em", y1: ".74em", d: "0.16s" },
  { ch: "O", x0: "1.21em", y0: "1.48em", x1: "3.01em", y1: ".74em", d: "0.2s" },
];

const at = (x0: string, y0: string, x1: string, y1: string, d: string) =>
  ({ "--x0": x0, "--y0": y0, "--x1": x1, "--y1": y1, "--d": d }) as CSSProperties;

function Dots({ on, count }: { on: number; count: number }) {
  return (
    <span className="dots" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <i key={i} className={i === on ? "on" : undefined} />
      ))}
    </span>
  );
}

export default function Home() {
  return (
    <StudioMotion>
      <div className="home">
        {/* The logo stands still; only the red ball rolls in and settles. */}
        <section className="open" aria-label="Studio Borne">
          <header className="top">
            <NavLinks />
          </header>
          <div className="op-in">
            <svg viewBox={LOGO_BOX} role="img" aria-label="Studio Borne logo">
              <path d={INK} fill="var(--color-charcoal)" fillRule="evenodd" />
              <path className="ball" d={BALL} fill="var(--color-brick)" fillRule="evenodd" />
            </svg>
            <div className="op-cap">
              <p className="cap">
                Studio Borne
                <br />
                Creative agency
              </p>
              <p className="cap">London</p>
            </div>
          </div>
          <a href="#studio" className="scroll">
            <i />
            <span className="cap">To the studio</span>
          </a>
        </section>

        <section className="hero" id="studio">
          <header className="top">
            <NavLinks />
          </header>
          <div className="ph">
            <Image
              src="/studio/hero-straw-hat.jpg"
              alt="Black and white photograph from behind of a woman in a wide straw hat tied with a long black satin ribbon"
              fill
              sizes="76vw"
              quality={92}
            />
          </div>
          <h1 className="word" aria-label="The studio, Studio Borne">
            {letters.map((l) => (
              <span key={l.ch} aria-hidden="true" style={at(l.x0, l.y0, l.x1, l.y1, l.d)}>
                {l.ch}
              </span>
            ))}
            <span className="dt" aria-hidden="true" style={at("1.94em", "1.48em", "3.68em", ".74em", "0.24s")}>
              <svg className="ldot" viewBox={BALL_BOX}>
                <path d={BALL} fill="currentColor" />
              </svg>
            </span>
            <span className="bn" aria-hidden="true" style={at("13.4em", "7.05em", ".4em", "10.9em", ".28s")}>
              borne
            </span>
          </h1>
          <ul className="idx hidx">
            <li><a href="#who">Who we are</a></li>
            <li><a href="#what">What we do</a></li>
            <li><a href="#clients">Clients</a></li>
            <li><a href="#why">Why it works</a></li>
          </ul>
        </section>

        <section className="intro">
          <p data-reveal="text">
            At Studio Borne, content creation and social media strategy is all <em>under one roof.</em>
          </p>
        </section>

        <section className="who" id="who">
          <div className="big" data-reveal="photo">
            <Image
              src="/studio/who-founders.jpg"
              alt="Black and white photograph of Ellie and Honor, co-founders of Studio Borne, sitting on bar stools and laughing"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <h2>Who we are</h2>
          </div>
          <div className="txt">
            <div className="sm" data-reveal="photo">
              <Image
                src="/studio/who-laptop.jpg"
                alt="Behind the scenes on a Studio Borne shoot: a laptop on a wooden block tethered by an orange cable, a camera and printed mood boards on the floor"
                fill
                sizes="(max-width: 900px) 54vw, 27vw"
              />
              <Dots on={1} count={3} />
            </div>
            <div className="body" data-reveal="text">
              <p>
                Studio Borne is a London-based social media strategy and content creation agency working
                internationally across the luxury and lifestyle sectors.
              </p>
              <p>
                We work as an extension of your team, taking the time to understand your brand, its identity and
                everything happening behind the scenes. Working closely with you, we show your brand in its best
                light, creating an impactful social presence that connects with your audience and makes them feel
                part of your story.
              </p>
              <p>
                We bring strategy and creativity together, from campaign concepts and creative direction to
                professional photography, videography and day-to-day social media management. Our approach is
                tailored to your brand, combining considered creativity with strategic thinking to engage audiences
                and deliver results.
              </p>
            </div>
          </div>
        </section>

        <section className="reel" aria-label="From the studio">
          <div className="band-h">
            <p className="cap">From the studio</p>
            <Dots on={0} count={4} />
          </div>
          <Strip speed={50} className="reel-strip">
            {reel.map((p) => (
              <figure key={p.src}>
                <Image src={p.src} alt={p.alt} fill sizes="320px" draggable={false} />
              </figure>
            ))}
          </Strip>
        </section>

        <section className="what3" id="what">
          <div className="w3-txt">
            <div className="w3-svc" data-reveal="text">
              <div>
                <h3><i className="w3d" />Content creation</h3>
                <p>
                  We produce professional photography, videography and iPhone content, with every shoot planned from
                  concept to delivery. Working closely with you, we consider past performance, upcoming campaigns and
                  seasonal opportunities to develop tailored shoot plans.
                </p>
                <p>
                  Each shoot is guided by your brand’s visual identity, ensuring a cohesive aesthetic while building a
                  versatile library of imagery and video for ongoing use.
                </p>
              </div>
              <div>
                <h3><i className="w3d" />Social media management</h3>
                <p>
                  Social media is one of your brand’s most powerful marketing tools, acting as your digital shop
                  window. It’s where potential customers discover who you are, what you do and what you stand for.
                </p>
                <p>
                  From planning and scheduling to day-to-day management, we ensure a consistent flow of engaging posts,
                  bring your story to life through a carefully curated grid, and continually refine our approach to
                  build on what works.
                </p>
              </div>
            </div>
            <details>
              <summary>Our services</summary>
              <p>We offer a range of tailored retainer packages, designed around your brand’s individual needs:</p>
              <ul>
                <li>Social media strategy, planning and scheduling</li>
                <li>Professional photography and videography</li>
                <li>iPhone content creation</li>
                <li>Campaign strategy, planning and production</li>
                <li>Social media copywriting</li>
                <li>Competitor and audience analysis</li>
                <li>Performance tracking and monthly reporting</li>
              </ul>
            </details>
          </div>
          <figure className="w3-ph" data-reveal="photo">
            <Image
              src="/studio/what-sitting-room.jpg"
              alt="Sunlit sitting room with white sofas, a linen lamp and a red and white chess set"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <h2>What we do</h2>
          </figure>
        </section>

        <section className="clients" id="clients">
          <div className="band-h">
            <p className="cap">Clients</p>
            <Dots on={0} count={4} />
          </div>
          <Strip speed={60} className="cl-strip">
            {clients.map((c) => (
              <div key={c.name} className="lg">
                <Image src={c.src} alt={c.name} width={c.width} height={c.height} sizes="200px" draggable={false} />
              </div>
            ))}
          </Strip>
        </section>

        <section className="why3" id="why">
          <figure className="y3-ph" data-reveal="photo">
            <Image
              src="/studio/why-waiter.jpg"
              alt="Waiter in a white jacket carrying cocktails across a sunny terrace with striped parasols and the sea behind"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <h2>Why it works</h2>
          </figure>
          <div className="y3-txt" data-reveal="text">
            <p className="y3-stat">Over half of all online brand discovery starts on social media channels.</p>
            <p>
              At Studio Borne, strategy and content creation work hand in hand. Bringing both under one roof ensures
              everything is aligned, from the initial concept to the final post.
            </p>
            <p>
              The result is a cohesive, considered social presence that tells your story, connects with your audience
              and delivers results.
            </p>
          </div>
        </section>

        <footer className="sign">
          <Logo className="sg-logo" />
          <Link className="sg-big" href="/contact">
            Say hello<i className="sg-dot" />
          </Link>
          <p className="sg-links">
            <Link href="/feed">The feed</Link>
            <span aria-hidden="true">·</span>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <span aria-hidden="true">·</span>
            <Instagram />
          </p>
        </footer>
      </div>
    </StudioMotion>
  );
}
