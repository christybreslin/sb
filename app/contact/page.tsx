import type { Metadata } from "next";
import Image from "next/image";
import "./hello.css";
import { EMAIL } from "@/lib/studio";

export const metadata: Metadata = { title: "Say hello" };

/* Built from the "Say hello" board in "Studio Borne – website.html". */
export default function Contact() {
  return (
    <div className="hello">
      <main>
        <div className="hl-row">
          <figure className="hl-ph page-in">
            <div>
              <Image
                src="/studio/hello-founders.jpg"
                alt="Ellie and Honor, co-founders of Studio Borne, smiling and leaning against a white panelled wall"
                fill
                sizes="(max-width: 900px) 100vw, 440px"
                preload
              />
            </div>
            <figcaption>Ellie and Honor, co-founders</figcaption>
          </figure>
          <div className="hl-txt page-in">
            <div className="hl-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <h1>Say hello</h1>
            <p>We’d love to hear from you! Drop us an email and let’s chat about how we could work together.</p>
            <div className="hl-mail">
              <span>Email us</span>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </footer>
    </div>
  );
}
