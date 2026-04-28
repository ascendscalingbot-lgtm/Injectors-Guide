# COS-IG Workspace

Autonomous Chief of Staff operating hub for Injectors Guide.

## What is here

- `app/` - Next.js App Router dashboard and API routes.
- `components/` - shadcn-style dashboard and UI components.
- `lib/dashboard-data.ts` - structured dashboard foundation data.
- `dashboard-new/index.html` - GitHub Pages-compatible static dashboard preview.
- `instructions/master-prompt.md` - saved durable operating instructions from the founder's master prompt.
- `context/website-context.md` - scraped public website context from Injectors Guide surfaces.
- `context/source-map.md` - source list and scrape notes.
- `context/github-v1-context.md` - notes from the GitHub v1 dashboard and website source.
- `operations/daily-brief-2026-04-27.md` - first operating packet.
- `operations/blockers.md` - credentials and access needed before live data can run.
- `operations/activity-log.md` - append-only operating log.
- `operations/automation-suggestions.md` - proposed recurring COS-IG automations.
- `operations/feature-upgrade-suggestions.md` - daily queue for dashboard improvement ideas.
- `content/blog-briefs/2026-04-27-how-to-become-an-aesthetic-injector.md` - first SEO brief.

## Current state

The workspace was empty at initialization and has now been converted into a Vercel-ready Next.js dashboard foundation. Live reporting, paid media pulls, revenue reconciliation, deploys, and API-backed automation are blocked until production credentials are added.

Run `npm install` and `npm run dev` to view the dashboard locally.

## Deployment Blockers

- Local npm install is currently blocked by DNS/network access to `registry.npmjs.org`.
- GitHub branch creation through the plugin failed with a 403, so PR creation is not available yet.
- Vercel CLI is installed, but it needs `vercel login` or a `VERCEL_TOKEN`.
- GitHub Pages static preview path: `/dashboard-new/`.
