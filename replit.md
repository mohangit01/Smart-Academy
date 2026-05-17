# SMART-ACADEMY

AI-powered global education platform with courses, events, job portal, blog, community, and AI smart search.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080, proxied at `/api`)
- `pnpm --filter @workspace/smart-academy run dev` — run the frontend (port 19295, proxied at `/`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string, `SESSION_SECRET`

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 18 + Vite + Tailwind CSS v4 + shadcn/ui + framer-motion + recharts + wouter
- API: Express 5
- DB: PostgreSQL + Drizzle ORM (schema in `lib/db/src/schema/`)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec in `lib/api-spec/openapi.yaml`)
- Generated hooks: `lib/api-client-react/src/generated/api.ts`
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/smart-academy/src/pages/` — all 20 frontend pages
- `artifacts/smart-academy/src/components/layout/` — Navbar, Footer
- `artifacts/smart-academy/src/components/shared/` — CourseCard, PageHeader
- `artifacts/api-server/src/routes/` — all API route handlers
- `lib/db/src/schema/` — Drizzle ORM schema (categories, users, courses, enrollments, events, jobs, blog, community)
- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for API contract)
- `lib/api-client-react/src/generated/` — generated React Query hooks & Zod schemas

## Pages

| Route | Page |
|-------|------|
| `/` | Home — hero, stats, categories, featured/trending courses, events, testimonials, community, CTA |
| `/courses` | Course catalog with search/filter by category & level |
| `/courses/:id` | Course detail with enrollment |
| `/categories` | Category browser |
| `/dashboard` | Student dashboard with progress, enrolled courses, recharts pie chart |
| `/events` | Events & webinars listing |
| `/events/:id` | Event detail with registration |
| `/jobs` | Job portal with search/filter |
| `/jobs/:id` | Job detail with apply |
| `/blog` | Blog listing with category filter |
| `/blog/:id` | Blog post detail |
| `/community` | Community posts with topic filter |
| `/search` | AI Smart Search with GPT-powered answers + course results |
| `/pricing` | 3-tier pricing (Free / Pro $29/mo / Enterprise) |
| `/about` | About page with team, values, timeline |
| `/contact` | Contact form with 3 office locations |
| `/login` | Sign in (demo) |
| `/signup` | Sign up with 7-day Pro trial (demo) |

## Architecture decisions

- Contract-first API: OpenAPI spec → Orval codegen → React Query hooks. Never write API calls by hand.
- Demo user ID 1 (Alex Johnson) used for dashboard — 3 enrollments seeded at 72%/45%/18% progress.
- AI search hits `/api/ai-search` which returns a mock AI answer (no external AI key needed).
- Theme: Tech blue primary (`hsl(221 83% 53%)`), deep navy dark mode background (`hsl(222 47% 5%)`).
- Wouter used instead of React Router — lightweight, works well with BASE_URL proxy setup.

## Product

SMART-ACADEMY is a full-stack edtech platform serving 125K+ learners across 120 countries. Features include:
- 4,500+ courses across 10 categories (Web Dev, AI/ML, Data Science, Cloud, Cybersecurity, Business, etc.)
- Live events and webinars
- Job portal with salary data and remote filters
- Community discussion board
- AI-powered smart search
- Student dashboard with progress tracking and charts
- 3-tier pricing (Free / Pro / Enterprise)

## User preferences

- Keep all page files in `src/pages/`, shared components in `src/components/shared/`
- Use real API data — no mocked/hardcoded content on pages
- Dark mode support via ThemeProvider + CSS custom properties

## Gotchas

- Always run `pnpm --filter @workspace/api-spec run codegen` after editing `openapi.yaml`
- Never call service ports directly — always go through `localhost:80` via the shared proxy
- Demo user ID is hardcoded as `1` in Dashboard — update to session-based auth when adding real auth
- The `users/dashboard/:id` route must come before `users/:id` in Express routes

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
