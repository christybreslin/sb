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

/* A description of every photo, for screen readers and search engines. */
const ALTS: Partial<Record<Id, string>> = {
  "eldon-dsc08101": "Woman in a navy corduroy jacket and knitted collar leaning on a stone stairway wall with a black leather bag",
  "eldon-10-july6471": "Woman in a navy knit jumper and white trousers sitting at the foot of a stone column",
  "eldon-4759": "Man in a camel jumper and pale blue scarf standing in a field beside two sheep",
  "eldon-dsc01056": "Woman in a black top and pleated skirt with red socks resting one foot on a wooden stool",
  "eldon-dsc01614": "Striped knitted scarves in many colours stacked on a small wooden stepladder",
  "eldon-dsc06936": "Woman in a charcoal coat with a red and white striped scarf and red wrist warmers",
  "eldon-whitstable3167-2": "Woman sitting on a seaside jetty with a pink knitted scarf over her shoulder",
  "eldon-whitstable3275": "Woman in a purple knitted headscarf leaning on a wooden boat in a harbour",
  "eldon-whitstable3404-2": "Woman in white with a pale pink scarf eating chips outside Wheelers Oyster Bar in Whitstable",
  eldon: "Woman in a white dress and sage green scarf lying back in long grass",
  "lhm-1": "Straw hat, book and two green drinks in arched niches of a terracotta wall above a green pool",
  "lhm-2": "Waiter pouring orange juice at a breakfast table beside the pool",
  "lhm-39157": "Waiter in white carrying a tray of coloured juices along a terracotta wall",
  "lhm-d16752": "Tadelakt bathroom basin with an arched brass mirror between two brass lanterns",
  "lhm-dsc06266-7": "White curtains drawn back from a carved doorway between two Moroccan lanterns, with orange trees above",
  "lhm-dsc07371": "Corner with an inlaid octagonal table, wicker chairs and a carved black screen",
  "lhm-dsc07494": "Palm and banana leaves framing white arched balconies around a courtyard",
  lhm: "Rooftop terrace with two loungers under a straw parasol beside a plunge pool",
  "lhm26032-2-1": "Lamplit corridor of horseshoe arches with an orange runner",
  lhm3: "Shaded terrace sofa with white cushions behind open white curtains",
  lhm4613: "Round dining table laid under an ornate mirror, with skirted white armchairs",
  "lv-3909-1": "Tan suede holdall with an A monogram on a window seat",
  "lv-4213-1": "Canvas holdall with a blue A monogram at a cottage door, a golden retriever sitting inside",
  "lv-4217-1": "Navy corduroy holdall with an orange B monogram and a pale blue blanket on a striped window seat",
  "lv-8958": "Canvas tote with burgundy handles on the edge of a stone wall fountain",
  "lv-dsc03850": "Pink striped holdall with a burgundy DM monogram on a pink bench by a window",
  "queen-pips-house3643-2": "Man pouring Queen rosé for a woman in sunglasses at an open garden door",
  "queen-dsc00489-1": "Two hands lifting bottles of Queen rosé from an ice bowl under a parasol, mountains behind",
  "queen-dsc00814-1": "Performers dressed as clowns in red and white stripes holding bottles of Queen rosé",
  "queen-dsc00976-2-2": "Two men with a bottle of Queen rosé in front of a Queen event backdrop",
  "queen-dsc01572-1": "Two guests laughing at a party, one holding a bottle of Queen rosé",
  "queen-dsc01624": "Guests in black raising glasses as Queen rosé is poured",
  "queen-dsc01646": "Guest in a cap holding a glass of rosé while a bottle of Queen is held up beside him",
  "queen-dsc05207": "Bottle and glass of Queen rosé on a beach blanket with a straw hat, basket and film camera",
  "queen-dsc05651": "Bottle of Queen rosé and two glasses on a rock among tropical plants",
  "queen-1": "Bottle of Queen rosé and two glasses on a wooden table by the sea, with palm trees",
  "vb-10228-2": "Bedroom with a rattan-panelled wall and orange bedspread, seen through a horseshoe arch",
  "vb-20942": "White sitting room with a wicker sofa, pale blue cushions and a bowl of oranges",
  "vm-20874-2-2-2": "White horseshoe arches leading to a green-framed window and a chequered floor",
  "vm-39023-2": "White sofas and a chess set on a glass table beside a tall window",
  "vm-15688": "White villa with striped parasols on the roof above a green garden",
  "vm-32839-2": "Waiter carrying cocktails across a terrace with green and white striped parasols and the sea behind",
  "vm-dsc03003-1": "Two waiters in white jackets and red fezzes holding cocktails in front of a painted mural",
  "vm-dsc08870": "Green door under a white Moorish arch above a black and white chequered floor",
  "vm14243-3": "Waiter carrying a tray of cocktails down a garden path through tropical plants",
  vm15567: "Cocktails on a green side table between striped poolside loungers",
  vm48874: "Stone garden pavilion draped in bougainvillea beyond a turquoise pool",
  vm25852: "Bowl of lemons beneath a stone urn on a sunlit balcony over the sea",
  "vm27172-2": "Garden pool lined with potted plants beneath bougainvillea-covered arches",
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
  "eldon-headscarf-bw":
    "Black and white portrait of a woman in a striped headscarf by a chain railing at the sea",
  eldondsc07360:
    "Black and white portrait of a woman with a leather shoulder bag looking back over her shoulder",
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

/* The photos that open The Feed, strongest first. They fill the top of the
   page in this order, left to right; everything else follows, mixed. Change
   this list to change what is seen first. */
export const featured: Id[] = [
  "lhm-1",
  "eldon-dsc06936",
  "vm-32839-2",
  "queen-dsc00489-1",
  "lhm-39157",
  "eldon-whitstable3167-2",
  "vm15567",
  "lv-dsc03850",
  "lhm3",
];

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
   is left to pile up at the bottom.

   The `first` photos are dealt before any of that, exactly in the order given. */
export function arrange(ids: Id[], lengths: number[], first: Id[] = []): Id[][] {
  type Placed = { client: string; top: number; bottom: number };
  const columns = lengths.map(() => [] as Id[]);
  const placed = lengths.map(() => [] as Placed[]);
  const filled = lengths.map(() => 0);
  const pinned = first.filter((id) => ids.includes(id));
  const waiting = ids.filter((id) => !pinned.includes(id));

  while (pinned.length || waiting.length) {
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

    const id = pinned.length ? pinned.shift()! : waiting.splice(pick, 1)[0];
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
