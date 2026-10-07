# Studio Borne v2: handover

Status as of 7 October 2026. The site is committed and pushed to the `v2` branch of
https://github.com/christybreslin/sb (private). **`main` on that repo is the old site and is
what Vercel deploys to production; it has not been touched.** `v2` shares no history with
`main`, so replacing the old site means either pointing Vercel's production branch at `v2`
or force-pushing `v2` over `main`. That is the owner's call. The production build passes.

## Run it

```
npx next dev -p 3001
```

- This Mac: http://localhost:3001
- Other devices on the same Wi-Fi: http://<this-mac's-ip>:3001 (was 192.168.0.107)

**Use port 3001, not 3000.** Another project (`~/workspace/claude/tart`) keeps a dev server
on 3000. When both ran on 3000, `localhost:3000` showed this site but the network address
showed the other one. `next.config.ts` sets `allowedDevOrigins` so phones on the local
network can load the dev site.

Checks: `npx eslint .`, `npx tsc --noEmit`, `npx next build`. All pass.

## What exists

| Route | State |
|---|---|
| `/` | One still screen, no scroll. Red wordmark fades in, the tagline's two halves slide in from either side and meet at the ampersand (option H7, chosen from ten), nav drops in on first mouse move. No footer. |
| `/feed` | The main piece of work. See below. |
| `/studio` | "The studio" (was About us; replaces Who, What and Why, which were deleted at the owner's request). Modelled on https://www.hardholy.com: small soft-brown text in narrow columns, whole uncropped photos, text and photo holding near the top while the taller one scrolls, and a chapter list at the right with the current chapter in italics (`components/StudioIndex.tsx`). Order: opening line and "Who we are", What we do (with a labelled "What that includes +" list of services), Why it works, closing photo with links to Say hello and The Feed. Content is `components/StudioContent.tsx`. Parts arrive as they are scrolled to, headings and paragraphs one after another (the owner chose "stagger" from seven options; `components/StudioMotion.tsx`). A "Clients" chapter shows the clients passing slowly in a line. Five logos were taken from the clients' own websites, turned single-colour brown by `scripts/make-client-logos.py` (sources in `scripts/client-logos/`) and saved to `public/clients/`. **Queen Rose and Harriet and Hera have no logo yet** (no official site could be identified) and are set in type. Eldon Cashmere now trades as "Eldon London", which is what its logo says. The owner has not yet confirmed the logos or that the clients are happy to be shown. Still being refined. No serif has been chosen, so it uses the site's one typeface. The Ellie and Honor section was removed at the owner's request (they are still named under "Why it works"). |
| `/contact` | One screen, large email link. Not reviewed. |

### The Feed (`components/Feed.tsx`, styles in `app/globals.css`)

- **Photos:** the 50 photos in the owner's second Drive download (`inspo/drive-download-20261007T134724Z-1-001/`, gitignored), web-sized by `scripts/optimize-images.mjs`. `lib/gallery.ts` shuffles them in a fixed order and deals them into columns (`arrange`).
- Three columns on desktop, two on phones. Columns start level at the top, sit a few
  pixels apart (`--feed-gap`), and have no heading or copy above them.
- **Different-speed columns.** Columns are deliberately different lengths. The frame is as
  tall as the shortest; longer columns hang out of the bottom and are slid up by script as
  the page scrolls, each by its own surplus, so they finish level. How long each column is relative to the shortest is set by the numbers in `WIDE` and `NARROW`
  in `Feed.tsx` (currently 1 : 1.4 : 1.18); change those to change the speeds. The page is
  `overflow-clip` so the overhang does not lengthen the page.
- **Heavier scroll.** Lenis (`lenis` package), Feed page only, mouse and trackpad only.
- **Fade in** on arrival, row by row.
- **Hover.** After a 0.09s pause the whole photo lifts by `--reveal` and uncovers the
  client's name on the cream beneath it (soft brown, small spaced capitals). Photos above
  it in the column are pushed up the same distance; the other columns rise about a third as
  far. Done in CSS with `:has()`.
- **Scroll guard.** While the page moves faster than 5px per scroll event, the frame
  ignores the pointer, so photos passing under a resting mouse do not lift.
- Touch screens have no hover, so names sit permanently under each photo.
- **Names under photos** come from the prefix the owner put on each file name (`CLIENTS` in `lib/gallery.ts`): LHM is L'Hôtel Marrakech, VM is Villa Mabrouka, ELDON is Eldon Cashmere, QUEEN is Queen Cuvée Rock n Roll, LV is London Velvet. Two files are prefixed VB, which was not on the owner's list and is assumed to be Villa Mabrouka.

### Assets and scripts

- `public/wordmark.png`: the red STUDIO BORNE wordmark, cut from the old logo artwork by
  `scripts/extract-logo.py`.
- `public/gallery/`: web-sized photos made from `images/` by
  `scripts/optimize-images.mjs`, which also writes `lib/gallery-data.json`.
- `public/cursors/`: the blob pointer at 1x and 2x, made by `scripts/make-cursors.mjs`.
  Same shapes, sizes and colours as the old site. They are PNGs because Chrome draws SVG
  cursors at low resolution on Retina screens.
- `images/` (77 MB of originals) and `studio-b/` (the old site) are gitignored and are
  reference only.

## How the owner wants this designed

These were learned the hard way. Read them before changing anything visual.

1. **Complete redesign.** Take nothing from `studio-b/` unless asked. The only things
   brought across so far: the logo source, the tab names, the factual wording, and the blob
   cursor.
2. **When asked to bring something from `studio-b/`, copy it exactly.** Recolouring the
   cursor, then replacing it with a custom trailing blob, were both rejected.
3. **Subtle, not loud.** Heavy textures, comic or novelty fonts, bright colours and
   distorted photos were all rejected. Never alter the photographs themselves.
4. **Do not guess at fonts or colours.** Several blind picks were rejected (Libre Caslon,
   Bodoni italic, a signature script, tinted caption colours). What worked was a page of
   real, working options to choose from by code.
5. **Study reference sites properly**, including hover and scroll behaviour, before
   designing. The main reference is https://www.ol.studio/photography (desktop: staggered
   columns that move at different rates, name on hover). Others are in
   `inspo/inspo-sites.txt`, plus the screenshot in `inspo/`.
6. **The dev server is live**, so the owner sees every intermediate state. Check a
   screenshot before leaving something on screen.

Decisions the owner has made: no scroll on the home page; tagline under the logo arriving as H7 "Meet";
gallery lives on The Feed; hover lettering is option 2b (small bold spaced capitals) in soft
brown; names under the photo, not over it.

Hover reactions, added site-wide because the owner asked for "hover reaction and dynamism
everywhere" and found a first, quieter pass invisible. Keep them visible when changing things:

- Nav tabs: the words roll up and are replaced from beneath (`.roll`), and the underline draws in (`.link-draw`). The small wordmark swells.
- Home: the wordmark leans towards the pointer; the tagline opens out when hovered.
- Studio: photos lean towards the pointer (`data-magnet`, `components/PointerEffects.tsx`); in the Clients line the hovered logo lifts and the others fade back; "Say hello" and "See The Feed" have their underline swept away and redrawn (`.link-sweep`); the "+" turns to a cross and the services arrive in sequence.
- Say hello: the text rises in on arrival; a rule draws under the email as it turns from red to ink.

## Abandoned, do not revive without asking

- A gapless photo grid under the home page logo.
- Names laid over photos (unreadable on these photos without a backing; shading was
  disliked).
- `/proto`: an alternate design with textured paper and hand-drawn or cut-paper blue
  lettering. Four versions were rejected and the owner asked for all of it to be deleted.
  It is gone from the code.

## Open items

1. Refine `/studio` with the owner; get logos for Queen Rose and Harriet and Hera, and confirm the other five; get a verdict on Say hello.
2. Proper descriptions (alt text) for the Feed photos, which are generic for now; confirm VB is Villa Mabrouka; the Clients line on `/studio` still says "Queen Rose" and "Eldon London".
3. Confirm `hello@studioborne.co`. Social links were left out because the old ones went
   nowhere.
4. Hover timing and scroll weight were still being tuned at the last exchange. The dials:
   `transition-delay` under `@media (hover: hover)` in `globals.css`; the `step < 5` and
   90ms values in `Feed.tsx`; `lerp` and `wheelMultiplier` on the Lenis instance.
5. The Feed spreads each client's photos apart automatically (`arrange` in `lib/gallery.ts`); on phones two same-client photos still meet side by side at a couple of scroll positions.
6. `README.md` is still the create-next-app default.
7. Putting `v2` live (see the top of this file). The owner's global rule for commits: no Claude co-author or session trailers, and `git config user.email` must be `christybreslin@icloud.com`.

## Gotchas

- **Checking work visually.** The Claude in Chrome extension disconnected early on and its
  tab had a phone-width viewport. Later checks were done by driving headless Chrome over
  its debugging port (screenshots, real mouse-move and wheel events). Headless Chrome does
  not draw a cursor, so the blob pointer has never been seen in a capture.
- **Hidden tabs lie.** In a background tab, images and animations stall, so screenshots can
  show blur placeholders or blank tiles that are not real bugs.
- **Next.js 16.** `priority` on `next/image` is deprecated in favour of `preload`. Docs for
  this version are in `node_modules/next/dist/docs/`.
- **Type errors mentioning `.next/dev/types/validator.ts`** after adding or deleting a
  route are stale generated types. `npx next typegen` clears them.
- `studio-b/` is excluded in `tsconfig.json`, `eslint.config.mjs` and the Tailwind
  `@source not` line in `globals.css`. Without those, lint, types and the build all pick up
  the old site.
