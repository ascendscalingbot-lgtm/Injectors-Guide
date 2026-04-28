export type Status = "blocked" | "queued" | "ready" | "watch" | "live";

export type Metric = {
  label: string;
  value: string;
  note: string;
  status: Status;
};

export const dashboardData = {
  lastUpdated: "Apr 28, 2026 10:15 PM",
  floorCopy:
    "Live revenue, spend, ROAS, and enrollment reporting stay labeled pending until Stripe, Meta, Google Ads, GA4, GSC, YouTube, ESP, GitHub, and Vercel are connected. COS-IG can still plan, queue, and surface decisions now.",
  metrics: [
    {
      label: "Today Revenue",
      value: "Pending",
      note: "Stripe restricted key needed",
      status: "blocked"
    },
    {
      label: "MTD Revenue",
      value: "Pending",
      note: "Weekly Stripe reconciliation required",
      status: "blocked"
    },
    {
      label: "MTD Spend",
      value: "Pending",
      note: "Meta and Google access required",
      status: "blocked"
    },
    {
      label: "Blended ROAS",
      value: "5.0x floor",
      note: "Scale only above floor",
      status: "ready"
    },
    {
      label: "Enrollments",
      value: "Pending",
      note: "Checkout events not connected",
      status: "queued"
    },
    {
      label: "Open Decisions",
      value: "7",
      note: "Founder review queue",
      status: "watch"
    }
  ] satisfies Metric[],
  alerts: [
    {
      title: "Attribution is not production-connected",
      detail:
        "The dashboard is ready for live feeds, but final ROAS and CPE should not be reported until Stripe reconciliation is active.",
      status: "blocked" as Status
    },
    {
      title: "Vercel import attempted as static repo",
      detail:
        "The new deployment should use this Next.js app root, not the older GitHub Pages static dashboard files.",
      status: "watch" as Status
    },
    {
      title: "Compliance review stays required",
      detail:
        "Any clinical specifics, medical claims, paid creative, or protected cast/show references should be routed to founder approval.",
      status: "ready" as Status
    }
  ],
  attribution: [
    {
      channel: "Meta Ads",
      spend: "Pending",
      revenue: "Pending",
      roas: "Pending",
      cpe: "Pending",
      status: "blocked" as Status,
      note: "Need Meta token, ad account ID, CAPI health, and buyer-list sync"
    },
    {
      channel: "Google Ads",
      spend: "$0",
      revenue: "$0",
      roas: "N/A",
      cpe: "N/A",
      status: "queued" as Status,
      note: "Branded search launch is queued after OAuth and budget approval"
    },
    {
      channel: "SEO",
      spend: "N/A",
      revenue: "Pending",
      roas: "Pending",
      cpe: "Pending",
      status: "queued" as Status,
      note: "GSC, GA4, and blog hub instrumentation needed"
    },
    {
      channel: "YouTube",
      spend: "N/A",
      revenue: "Pending",
      roas: "Pending",
      cpe: "Pending",
      status: "queued" as Status,
      note: "Long-form library and YouTube API access needed"
    },
    {
      channel: "PR",
      spend: "N/A",
      revenue: "Pending",
      roas: "Pending",
      cpe: "Pending",
      status: "ready" as Status,
      note: "Pitch queue can start once press assets are approved"
    },
    {
      channel: "Email",
      spend: "Pending",
      revenue: "Pending",
      roas: "Pending",
      cpe: "Pending",
      status: "blocked" as Status,
      note: "Confirm Klaviyo or ConvertKit before lifecycle automation"
    }
  ],
  decisions: [
    {
      title: "Connect production access",
      owner: "Founder",
      detail:
        "Provide Stripe, Meta, Google Ads, GA4, GSC, YouTube, ESP, GitHub, and Vercel access for live reporting and autonomous execution.",
      status: "blocked" as Status
    },
    {
      title: "Approve admin access model",
      owner: "Founder",
      detail:
        "Choose Clerk, Supabase Auth, or Vercel auth for the admin-only dashboard area.",
      status: "queued" as Status
    },
    {
      title: "Approve first SEO brief",
      owner: "Founder",
      detail:
        "How to Become an Aesthetic Injector is ready for brand and compliance review before publishing.",
      status: "ready" as Status
    },
    {
      title: "Confirm pricing source of truth",
      owner: "Founder",
      detail:
        "Public offer, founding-student pricing, and ad copy must match before paid media expansion.",
      status: "watch" as Status
    }
  ],
  pipeline: [
    {
      lane: "Idea",
      cards: [
        {
          title: "Is online injector training legitimate?",
          description:
            "Objection content for nurses researching online education plus hands-on training.",
          tags: ["SEO", "Objection"]
        },
        {
          title: "7 questions before your first injector job offer",
          description: "Lead magnet for email capture and welcome sequence.",
          tags: ["Email", "Lead magnet"]
        }
      ]
    },
    {
      lane: "Brief",
      cards: [
        {
          title: "How to become an aesthetic injector",
          description: "Career-path pillar brief seeded for founder approval.",
          tags: ["SEO", "High intent"]
        }
      ]
    },
    {
      lane: "Drafted",
      cards: [
        {
          title: "Daily short-form batch",
          description:
            "Three scripts covering burnout, anti-gatekeeping, and hiring support.",
          tags: ["Short-form"]
        }
      ]
    },
    {
      lane: "In Review",
      cards: [
        {
          title: "Creative testing concepts",
          description:
            "Five paid concepts queued. No protected show or cast references included.",
          tags: ["Meta", "Compliance"]
        }
      ]
    },
    { lane: "Scheduled", cards: [] },
    { lane: "Published", cards: [] },
    { lane: "Performance", cards: [] }
  ],
  modules: [
    {
      title: "Paid Media",
      eyebrow: "Module 4",
      rows: [
        ["Meta account audit", "Blocked"],
        ["Google branded search", "Queued"],
        ["Creative testing slot", "Ready"],
        ["Budget guardrails", "5x floor"]
      ]
    },
    {
      title: "SEO Command",
      eyebrow: "Module 3",
      rows: [
        ["Technical baseline", "Blocked"],
        ["Keyword queue", "Ready"],
        ["Blog hub", "Queued"],
        ["Schema map", "Drafted"]
      ]
    },
    {
      title: "PR Tracker",
      eyebrow: "Module 5",
      rows: [
        ["Press kit", "Queued"],
        ["Pitch angle", "Ready"],
        ["Query monitoring", "Blocked"],
        ["Backlink tracker", "Queued"]
      ]
    }
  ],
  featureUpgrades: [
    {
      title: "Approve/Deny feature queue",
      impact:
        "Lets Traci approve daily dashboard improvements directly from the command center.",
      owner: "COS-IG",
      status: "ready" as Status
    },
    {
      title: "Blockers memory panel",
      impact:
        "Reads operations/blockers.md and keeps the highest-leverage access needs visible.",
      owner: "COS-IG",
      status: "ready" as Status
    },
    {
      title: "Agent org chart",
      impact:
        "Shows channel agents for paid media, SEO, content, PR, lifecycle, analytics, and web ops.",
      owner: "COS-IG",
      status: "queued" as Status
    },
    {
      title: "Live approvals with audit log",
      impact:
        "Creates an append-only trail for creative approvals, budget changes, and compliance review.",
      owner: "Founder + COS-IG",
      status: "queued" as Status
    }
  ],
  admin: [
    ["Admin identities", "Traci + approved team members"],
    ["Auth layer", "Choose Clerk, Supabase Auth, or Vercel auth"],
    ["Sensitive integrations", "Stripe, Meta, Google, ESP, YouTube"],
    ["Audit policy", "Every autonomous action logged with reason and result"]
  ],
  blockers: [
    "Stripe restricted key for revenue reconciliation",
    "Meta Ads long-lived token, ad account ID, pixel/CAPI access",
    "Google Ads OAuth, developer token, and customer ID",
    "GA4 property ID and GSC verified property access",
    "ESP decision: Klaviyo or ConvertKit",
    "Admin auth choice for private dashboard areas"
  ],
  activity: [
    [
      "Apr 27 06:00",
      "Workspace inspected",
      "Saved master prompt, website context, blockers, and initial operating docs."
    ],
    [
      "Apr 27 09:20",
      "Dashboard V1 reviewed",
      "Confirmed the live GitHub Pages dashboard is the visual direction to preserve."
    ],
    [
      "Apr 27 10:05",
      "Next.js conversion started",
      "Moved from static prototype toward a Vercel-ready application structure."
    ],
    [
      "Apr 28 10:15",
      "COS-IG app shell rebuilt",
      "Added admin, alerts, feature upgrades, blockers, chat, and deploy readiness modules."
    ]
  ]
};
