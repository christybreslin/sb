import type { Metadata } from "next";
import logos from "@/lib/clients-data.json";

/* From the studio: the photos in the order the design board gives them, which
   keeps two photos from the same client from sitting side by side. Files come
   from scripts/extract-design-assets.py. */
export const reel: { src: string; alt: string }[] = [
  "Model in a red and white striped knitted scarf and charcoal coat",
  "Brass basin and arched brass mirror lit by two lanterns in a tadelakt bathroom",
  "Model in a navy corduroy suit holding a black leather bag on stone steps",
  "Garden pool beneath arches draped in bougainvillea",
  "Model on a pier with a pink and red striped scarf over her shoulder",
  "Two waiters in white jackets and red fezzes holding cocktails in front of a mural",
  "Waiter pouring orange juice at a poolside breakfast table",
  "Snow-covered wooden chalet beneath a mountain peak",
  "Model in a red striped knitted headscarf by the sea",
  "Blue corduroy holdall with an orange leather B monogram on a window seat",
  "Garden pavilion with terracotta pots beside a green-tiled pool",
  "Marrakech rooftops and palm trees at golden hour",
  "Winemaker and Roger Taylor with a bottle of Queen rosé",
  "Model crouching against a pale stone wall in a striped scarf",
  "Waiter carrying a tray through white Moorish arches over a chequered floor",
  "Wine bottles in ice buckets with snowy mountains behind",
  "Black and white portrait of a model with a leather shoulder bag",
  "Straw hat, book and two drinks by a pool beneath carved arches",
  "Striped knitted scarves in many colours draped over a wooden stand",
  "White wicker sofa with pale blue cushions and a bowl of oranges",
].map((alt, i) => ({ src: `/studio/reel-${String(i + 1).padStart(2, "0")}.jpg`, alt }));

/* Each client's own logo, in its own colours (scripts/make-client-logos.py),
   in the order the design board gives them. */
const named: [string, keyof typeof logos][] = [
  ["Queen Rose", "queen-rose"],
  ["Eldon London", "eldon-london"],
  ["L’Hôtel Marrakech", "lhotel-marrakech"],
  ["Villa Mabrouka", "villa-mabrouka"],
  ["Harriet and Hera", "harriet-and-hera"],
  ["Salsa Rose", "salsa-rose"],
  ["London Velvet", "london-velvet"],
];
export const clients = named.map(([name, logo]) => ({ name, key: logo, ...logos[logo] }));

export const EMAIL = "hello@studioborne.co.uk";

type OpenGraph = NonNullable<Metadata["openGraph"]>;

/* What every page shares in its link preview; each page adds its own title
   and description (a page's openGraph replaces the layout's, not merges).
   The picture is made by scripts/make-share-image.py. */
export const SHARE: OpenGraph = {
  siteName: "Studio Borne",
  locale: "en_GB",
  type: "website",
  images: [
    {
      url: "/share.jpg",
      width: 1200,
      height: 630,
      alt: "Studio Borne: the sb logo beside a black and white photograph of a woman in a wide straw hat",
    },
  ],
};

/* The Instagram profile. If emptied, the icon shows greyed out and leads nowhere. */
export const INSTAGRAM = "https://www.instagram.com/studio.borne/";
