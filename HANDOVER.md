# Studio Borne v2: handover

Status as of 9 November 2026. v2 is on `main` of https://github.com/christybreslin/sb
(private), which is what Vercel deploys to production; the old `v2` branch is stale.

On 9 November the site was rebuilt from the owner's final Claude Design export,
`Studio Borne – website.html` (repo root, untracked, 7 MB), and a developer brief. The
export holds two boards, "The studio – home" and "Say hello"; the design is final and is
built faithfully. The previous linen-white version is commit `a36a765`.

## Run it

```
npx next dev -p 3001
```

- This Mac: http://localhost:3001
- Other devices on the same Wi-Fi: http://<this-mac's-ip>:3001 (was 192.168.1.167)

**Use port 3001, not 3000.** Another project (`~/workspace/claude/tart`) keeps a dev server
on 3000. When both ran on 3000, `localhost:3000` showed this site but the network address
showed the other one. `next.config.ts` sets `allowedDevOrigins` so phones on the local
network can load the dev site.

Checks: `npx eslint .`, `npx tsc --noEmit`, `npx next build`. All pass.

## What exists

| Route | State |
|---|---|
| `/` | The "The studio – home" board (`app/page.tsx`, styles in `app/home.css`, scoped to `.home`). Opener: the sb logo stands still while the red ball rolls in once from the right edge; caption, thin line and "To the studio". Then the hero: stepped serif STUDIO with BORNE, gliding into one line "STUDIO." and back on a 7s loop, beside the straw-hat photo, with section links bottom left. Then the intro line, Who we are, From the studio (gliding photo strip), What we do (services dropdown), Clients (gliding logo strip), Why it works, and the sign-off: "Say hello." and The feed · email. Sections reveal as they are scrolled to (`components/StudioMotion.tsx`). |
| `/feed` | The main piece of work. See below. |
| `/studio` | Redirects to `/` (`next.config.ts`). |
| `/contact` | The "Say hello" board (`app/contact/page.tsx`, `app/contact/hello.css`). |

Shared: brand tokens and fonts (Figtree, Noto Serif Display) in `app/layout.tsx` and
`app/globals.css`; the thin page frame (`.page-frame`); the header with logo and tabs on
every page but home (`components/Nav.tsx`); the sb logo (`components/Logo.tsx`); the two
gliding strips (`components/Strip.tsx`: drift, pause on hover, sideways trackpad scroll,
drag, swipe). Clients shows the five logos we have, in their own colours.

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

- `public/studio/`: the photos from the design boards, unpacked from the export by
  `scripts/extract-design-assets.py`. Alt text is in `lib/studio.ts` and `app/page.tsx`.
- `public/clients/`: client logos in their own colours, made by `scripts/make-client-logos.py`.
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

Hover reactions must stay visible (the owner found a quiet first pass invisible): tabs and
links underline and turn brick red, section links' dots turn red and grow, reel photos zoom
slightly, client tiles lift, the services "+" turns to "–", "Say hello." turns red and its dot
steps out, and the header logo swells.

## Abandoned, do not revive without asking

- A gapless photo grid under the home page logo.
- Names laid over photos (unreadable on these photos without a backing; shading was
  disliked).
- `/proto`: an alternate design with textured paper and hand-drawn or cut-paper blue
  lettering. Four versions were rejected and the owner asked for all of it to be deleted.
  It is gone from the code.

## Open items

1. Logo files for Queen Rose and Harriet and Hera (left out of Clients until supplied); the Instagram link (hidden until supplied); whether vertical mouse-wheel over a strip should scroll it sideways (currently only trackpad sideways scroll and drag, so the page never gets stuck).
2. Proper descriptions (alt text) for the Feed photos, which are generic for now; confirm VB is Villa Mabrouka; 
3. Email is now `hello@studioborne.co.uk` everywhere (confirmed in the brief).
4. Hover timing and scroll weight were still being tuned at the last exchange. The dials:
   `transition-delay` under `@media (hover: hover)` in `globals.css`; the `step < 5` and
   90ms values in `Feed.tsx`; `lerp` and `wheelMultiplier` on the Lenis instance.
5. The Feed spreads each client's photos apart automatically (`arrange` in `lib/gallery.ts`); on phones two same-client photos still meet side by side at a couple of scroll positions.
6. `README.md` is still the create-next-app default.
7. The owner's global rule for commits: no Claude co-author or session trailers, and `git config user.email` must be `christybreslin@icloud.com`.

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
