# COS-IG Blockers

## Access Required

| System | Needed For | Required From |
|---|---|---|
| Site GitHub repo | Branches, PRs, blog hub, press page, schema, deploy workflow | Founder or technical owner |
| Vercel project + token | Preview URLs, production deploys, Lighthouse checks | Founder or technical owner |
| Meta Ads API token | Spend, creative fatigue, CAPI health, audience refreshes | Founder or media buyer |
| Google Ads OAuth + developer token | Branded search launch and reporting | Founder or media buyer |
| Google Search Console access | SEO keyword and page reporting | Founder or technical owner |
| GA4 property access | Funnel and channel attribution | Founder or technical owner |
| Stripe restricted key | Revenue reconciliation and enrollment source of truth | Founder |
| YouTube Data API access | Video performance and comment monitoring | Founder |
| ESP confirmation and API key | Lead magnet, welcome sequence, cart recovery, newsletter | Founder |
| Press kit assets | `/press` page and earned media outreach | Founder |
| HighLevel payment/ad reporting endpoints or export access | Full past-month revenue, first-purchase history, and Facebook ad spend without using the web UI | Founder or HighLevel admin |
| GitHub write access | Create feature branches, commits, and PRs from COS-IG | Repository owner / GitHub App permissions |
| Vercel token or login | Preview deployments from this environment | Founder or technical owner |
| npm registry network access | Local dependency install and build verification | Environment/network owner |

## Current Deployment Notes

- GitHub plugin read access is working for `ascendscalingbot-lgtm/Injectors-Guide`.
- GitHub branch creation failed with a 403: `Resource not accessible by integration`.
- Founder reports the GitHub plugin is not visible under installed GitHub Apps, so the Codex/OpenAI GitHub connector likely needs to be reauthorized or reinstalled for this repo.
- Git, Node, and npm are installed locally (`git 2.50.1`, `node v25.6.1`, `npm 11.9.0`).
- This workspace folder is not currently a cloned Git repository, so local commits/pushes need either a fresh clone or a remote initialized after network access works.
- Local CLI access to `github.com` and `registry.npmjs.org` is currently blocked by DNS/network restrictions.
- Vercel CLI is installed, but no credentials are present. It needs `vercel login` or a `VERCEL_TOKEN`.
- The local project has been converted to a Next.js App Router structure and is ready for dependency install/build once network or Vercel deployment credentials are available.
- GitHub Pages can host the static `/dashboard-new/` dashboard, but it cannot securely run the future COS-IG AI chat, admin auth, or private API integrations by itself.
- HighLevel connector access can read recent contacts and attribution, but currently only returns the newest contact page and does not expose payment transactions, opportunities, ad spend, impressions, CTR, CPM, or CPC. Revenue can be estimated from visible `Payment Form` contacts at `$1,497` each, but full-month reporting is not yet verifiable from the connector alone.

## Highest-Leverage Blockers To Ask Founder For

1. GitHub App write access for `ascendscalingbot-lgtm/Injectors-Guide`.
2. Reauthorize or reinstall the Codex/OpenAI GitHub connector for the target GitHub account/organization and grant repo write permissions.
3. Vercel token/login or confirmation that GitHub Pages is the only deploy target for now.
4. Backend choice for AI chat and admin auth: recommended path is Vercel API routes plus OpenAI/Codex integration and an auth provider.
5. Stripe restricted key, Meta Ads token, Google Ads access, GA4, GSC, YouTube, and ESP credentials.
6. Approved admin user list: Traci plus named team members.
7. HighLevel connector/payment endpoint fix, HighLevel export access, or Stripe source-of-truth access so COS-IG can verify the full past-month purchase count without web UI.

## GitHub SSH Deploy Key Status

- Deploy key generated locally at `.ssh/injectors_guide_deploy_key`.
- SSH config saved at `.ssh/config` using host alias `github-injectors-guide`.
- Public key is ready for GitHub deploy key setup.
- Founder reports the key has been added under Codex.
- Confirm the GitHub deploy key was added to the `ascendscalingbot-lgtm/Injectors-Guide` repository and that **Allow write access** is enabled.
- SSH config path was corrected for the workspace folder name with a space.
- Current test result: local shell cannot resolve `github.com` over SSH (`Could not resolve hostname github.com`), so deploy-key verification is blocked by local network/DNS rather than the key file.
- Still needed: network access from this environment to `github.com`, then run `ssh -F .ssh/config -T github-injectors-guide`.

## Compliance Notes

- New ad creative concepts require founder approval before submission.
- Any copy using protected show names, cast names, or trademarks requires rights confirmation before paid usage.
- Clinical education topics require human clinical review before publish.
- Offer-page copy changes always require founder approval.
