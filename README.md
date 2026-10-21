# MarkdAthlete

**Get Seen. Get Sponsored. Get Markd.** — markdathlete.com

A sponsorship platform for runners and endurance athletes. Athletes get a profile with their bio, stats and upcoming races, and open a campaign for each race listing the spots sponsors can cover (race entry, hotel, flights, logo on kit, temp tattoo, IG shout-out). Sponsors cover a spot, chip in from $10 or make an offer, and land on the **Sponsor Wall**.

Plain HTML/CSS/JS — no build step. Deploys to Vercel as a static site.

## Pages

| Page | File |
|---|---|
| Home (hero, campaigns, how it works, athletes, sponsor wall, mission) | `index.html` |
| Athletes roster with sport filter + search | `athletes.html` |
| Athlete profile + race campaign + sponsor form | `athlete.html?id=<athlete-id>` |
| Open campaigns | `campaigns.html` |
| Sponsor wall | `sponsors.html` |
| How it works + FAQ | `how-it-works.html` |
| The Mission | `about.html` |
| Athlete application | `get-sponsored.html` |

## Editing content

Everything lives in **`assets/js/data.js`**:

- `MA_ATHLETES` — add an athlete object (id, name, headline, bio, races, spots). Add `photo: "assets/img/athletes/name.jpg"` and `cover: "assets/img/athletes/name-cover.jpg"` to use real photos instead of the generated art.
- A race with `campaign: true` shows the sponsor block. Each spot has a `type`, `price` and `sponsoredBy` (a sponsor id, or `null` if open).
- `MA_SPONSORS` — the sponsor wall. Add `logo: "assets/img/sponsors/name.png"`, `website`, `instagram`.
- `MA_CONFIG` — contact email, Instagram, announcement bar text, form endpoint.

> ⚠️ The athletes and sponsors in `data.js` are **sample placeholders**. Replace them with real people and businesses (with their permission) before launch.

## Forms

The sponsor form and athlete application send to `MA_CONFIG.formEndpoint` (e.g. a Formspree form URL or a Supabase edge function). If it's empty, they open a pre-filled email to `MA_CONFIG.contactEmail`.

Payments are not processed on the site yet — sponsors get a payment link by email. To take card payments and hold funds until race-day proof, add **Stripe Connect** (athletes as connected accounts, manual payouts after proof).

## Deploy

1. Push to GitHub (`markdathlete/markdathlete`).
2. In Vercel: **Add New → Project → Import** the repo. Framework preset: **Other**. No build command.
3. Add domain `markdathlete.com` in Vercel → Settings → Domains and point your DNS (A record `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`).
