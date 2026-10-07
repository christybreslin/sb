import data from "./gallery-data.json";

export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  alt: string;
  /* Whether text set over the photo should be "light" (cream) or "dark" (ink). */
  tone: string;
  /* Shown beneath the photo on The Feed. */
  client: string;
};

type Id = keyof typeof data;
export type PhotoId = Id;

/* Who a photo was for, read from the prefix the owner gave each file name.
   "VB" was not on the owner's list; two other VB files were renamed VM, so it
   is taken to be Villa Mabrouka too. */
const CLIENTS: [prefix: string, name: string][] = [
  ["lhm", "L\u2019H\u00f4tel Marrakech"],
  ["vm", "Villa Mabrouka"],
  ["vb", "Villa Mabrouka"],
  ["eldon", "Eldon Cashmere"],
  ["queen", "Queen Cuv\u00e9e Rock n Roll"],
  ["lv", "London Velvet"],
];

/* Descriptions written for the photos used on the Studio page. */
const ALTS: Partial<Record<Id, string>> = {
  "dsc06867-2": "Straw hat and two drinks in an arched terracotta wall above a green pool",
  "dsc09157-2": "Sun loungers beside a green tiled plunge pool",
  dsc06224: "Bowl of white roses on green and white zellige tiles",
  vb28906: "Teal painted doors under a white horseshoe arch",
  "vb20937-edit": "White wicker lounge with pale blue cushions",
  dsc00175: "Bedroom with a green headboard and blanket against white walls",
  vm27171: "Palm tree over a flower-filled garden and a green pool",
  dsc06171: "Palm trees and terracotta rooftops at sunset",
  dsc07530: "Courtyard and palm trees lit up at night",
  dsc07545: "Lantern-lit garden path under orange trees at night",
};

const clientOf = (id: Id) => CLIENTS.find(([prefix]) => id.startsWith(prefix))?.[1] ?? "";

function describe(id: Id): Photo {
  const client = clientOf(id);
  const { src, width, height, blurDataURL, tone } = data[id];
  return {
    id,
    src,
    width,
    height,
    blurDataURL,
    tone,
    client,
    alt: ALTS[id] ?? (client ? `Photograph for ${client}` : "Photograph by Studio Borne"),
  };
}

export function photo(id: Id): Photo {
  return describe(id);
}

/* A fixed shuffle, so shoots are mixed together and the order never changes
   between visits. */
const scatter = (id: string) => {
  let h = 7;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) % 9973;
  return h;
};

/* Everything on The Feed. */
export const feed: Id[] = (Object.keys(data) as Id[])
  .filter((id) => data[id].set === "feed")
  .sort((a, b) => scatter(a) - scatter(b));

/* Deals the photos into columns. `lengths` says how long each column should be
   relative to the others: the next photo always goes to whichever column is
   furthest behind its share.

   Which photo goes there is chosen to keep each client's work spread out: never
   directly under a photo for the same client if that can be avoided, and
   preferably not beside one in a neighbouring column either. Because longer
   columns slide further as the page scrolls, "beside" is judged by how far
   down its own column each photo is, which is where they meet on screen. Among the photos
   that qualify, the client with the most still to place goes first, so nobody
   is left to pile up at the bottom. */
export function arrange(ids: Id[], lengths: number[]): Id[][] {
  type Placed = { client: string; top: number; bottom: number };
  const columns = lengths.map(() => [] as Id[]);
  const placed = lengths.map(() => [] as Placed[]);
  const filled = lengths.map(() => 0);
  const waiting = [...ids];

  while (waiting.length) {
    let col = 0;
    lengths.forEach((_, i) => {
      if (filled[i] / lengths[i] < filled[col] / lengths[col]) col = i;
    });

    const left = new Map<string, number>();
    for (const id of waiting) left.set(clientOf(id), (left.get(clientOf(id)) ?? 0) + 1);

    const clash = (id: Id) => {
      const client = clientOf(id);
      const top = filled[col] / lengths[col];
      const bottom = top + data[id].height / data[id].width / lengths[col];
      const above = placed[col].slice(-2).reverse();
      let n = 0;
      if (above[0]?.client === client) n += 100;
      if (above[1]?.client === client) n += 10;
      for (const side of [col - 1, col + 1])
        for (const p of placed[side] ?? [])
          if (p.client === client && p.top < bottom && p.bottom > top) n += 30;
      return n;
    };

    let pick = 0;
    let best = Infinity;
    waiting.forEach((id, i) => {
      /* Lower is better: clashes first, then whoever has most left to place. */
      const score = clash(id) * 1000 - (left.get(clientOf(id)) ?? 0);
      if (score < best) {
        best = score;
        pick = i;
      }
    });

    const [id] = waiting.splice(pick, 1);
    const height = data[id].height / data[id].width;
    columns[col].push(id);
    placed[col].push({
      client: clientOf(id),
      top: filled[col] / lengths[col],
      bottom: (filled[col] + height) / lengths[col],
    });
    filled[col] += height;
  }
  return columns;
}
