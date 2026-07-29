# The Walnut Initiative — website

Next.js 14 (App Router) + Tailwind CSS + Supabase.

## Design system
- **Colors**: beige (`#F3EEE2`/`#E7DFC9`/`#FAF7EF`), deep green (`#3E513C`) for text/high-contrast, sage (`#6B8064`), walnut brown (`#8A6A45`) as a sparing accent.
- **Type**: Fraunces (display) + Inter (body) — see `app/layout.tsx`.
- **Signature element**: the "walnut crack" divider (`components/WalnutDivider.tsx`) — a hand-drawn line that reads as both a walnut shell's furrow and a cortical fold, used once per page as a section break rather than as decoration.
- **Motion**: Framer Motion, all core transitions 200–280ms with an `ease-out-soft` curve, respects `prefers-reduced-motion`. Gallery + testimonials get slightly more production polish (scroll-snap carousel, staggered reveal); nothing gets hover-scale-everywhere or instant state swaps.

## Getting started
```bash
npm install
cp .env.local.example .env.local   # then fill in your real Supabase project URL + anon key
npm run dev
```

## Supabase setup
1. Create a Supabase project.
2. In the SQL editor, run `supabase/schema.sql` — creates `user_profiles`, `blogs`, `courses`, `course_progress`, `contact_messages`, all RLS-enabled, plus seed rows for blogs/courses.
3. In **Authentication → Providers**, Email is enabled by default. For local testing, you can disable "Confirm email" so signup works instantly; leave it on for production.
4. Copy your Project URL + anon public key into `.env.local`.

## Row Level Security summary
| Table | Read | Write |
|---|---|---|
| `blogs` | public (published only) | none from client (dashboard/service role) |
| `courses` | public | none from client |
| `user_profiles` | owner only | owner only (insert/update) |
| `course_progress` | owner only | owner only (insert/update/delete) |
| `contact_messages` | nobody from client | anyone can insert |

## Pages
- `/` — Hero, subtext, Join Us CTA (→ Linktree via `NEXT_PUBLIC_LINKTREE_URL`), initiatives preview. Footer (global) has the Contact form.
- `/initiatives` — grid of the 5 programs.
- `/gallery` — scroll-snap "Workshop Highlights" carousel + Testimonials grid.
- `/blog` — Server Component, fetches from Supabase `blogs`; falls back to `lib/mock-data.ts` if env vars aren't set or the query fails, so the page always renders.
- `/courses` — course catalog with per-user progress (reads `course_progress` for the logged-in user), plus FAQ accordion.
- `/auth/login`, `/auth/signup` — email/password auth via Supabase.

## Notes
- Gallery images are placeholder SVGs in `public/placeholders/` — swap in real photos (or `Branding.jpg` per your project rules) whenever ready.
- `Beige Primary Logo.png` / `Green Primary Logo.png` aren't wired in yet since they weren't uploaded — drop them in `public/` and swap the text logo in `components/Navbar.tsx` for an `<Image>` when ready.
