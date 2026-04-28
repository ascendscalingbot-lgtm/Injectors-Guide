import Link from "next/link";
import {
  Activity,
  BarChart3,
  Bell,
  Bot,
  CheckCircle2,
  CircleDollarSign,
  FileText,
  Gauge,
  GitPullRequest,
  KeyRound,
  LayoutDashboard,
  LockKeyhole,
  Megaphone,
  MessageSquareText,
  Rocket,
  Search,
  ShieldCheck,
  WandSparkles
} from "lucide-react";
import { CosChat } from "@/components/dashboard/cos-chat";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { dashboardData, type Status } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#overview", label: "Overview", icon: LayoutDashboard },
  { href: "#chat", label: "AI Chat", icon: MessageSquareText },
  { href: "#attribution", label: "Attribution", icon: BarChart3 },
  { href: "#pipeline", label: "Content Pipeline", icon: FileText },
  { href: "#paid", label: "Paid Media", icon: CircleDollarSign },
  { href: "#features", label: "Feature Upgrades", icon: WandSparkles },
  { href: "#admin", label: "Admin", icon: LockKeyhole, admin: true },
  { href: "#activity", label: "Activity Log", icon: Activity }
];

const statusVariant: Record<Status, "destructive" | "secondary" | "success" | "warning" | "muted"> = {
  blocked: "destructive",
  queued: "secondary",
  ready: "success",
  watch: "warning",
  live: "success"
};

const barSegments = [
  ["Meta", "52%", "bg-primary"],
  ["Google", "23%", "bg-accent"],
  ["SEO", "13%", "bg-secondary"],
  ["Email", "12%", "bg-foreground"]
];

function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge variant={statusVariant[status]} className="capitalize">
      {status}
    </Badge>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <CardDescription className="text-xs font-black uppercase">{eyebrow}</CardDescription>
      <CardTitle className="display-title mt-2 text-4xl font-medium leading-none sm:text-5xl">
        {title}
      </CardTitle>
      <CardDescription className="mt-3 max-w-2xl leading-6">{description}</CardDescription>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="glass-panel sticky top-4 flex h-auto flex-col gap-6 rounded-[2rem] p-5 lg:h-[calc(100vh-2rem)]">
      <Link href="#overview" className="flex items-center gap-3">
        <div className="grid size-12 place-items-center rounded-2xl bg-primary text-sm font-black text-primary-foreground shadow-card">
          IG
        </div>
        <div className="min-w-0">
          <p className="display-title truncate text-3xl leading-none text-primary">
            Injectors Guide
          </p>
          <p className="mt-1 text-xs font-bold uppercase text-muted-foreground">
            COS-IG Command
          </p>
        </div>
      </Link>

      <nav className="grid gap-1 md:grid-cols-2 lg:grid-cols-1" aria-label="Dashboard sections">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-h-11 items-center justify-between gap-3 rounded-full px-3 text-sm font-semibold text-muted-foreground transition hover:bg-card/75 hover:text-primary hover:shadow-card",
                index === 0 && "bg-card/75 text-primary shadow-card"
              )}
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="grid size-7 place-items-center rounded-full bg-primary/10 text-primary">
                  <Icon aria-hidden="true" className="size-3.5" />
                </span>
                <span className="truncate">{item.label}</span>
              </span>
              {item.admin ? <Badge variant="muted">Admin</Badge> : null}
            </Link>
          );
        })}
      </nav>

      <Card className="mt-auto overflow-hidden rounded-3xl border-primary/10 bg-primary text-primary-foreground shadow-card">
        <CardHeader className="p-4">
          <CardDescription className="text-brand-sky">Operating Floor</CardDescription>
          <CardTitle className="display-title text-4xl font-medium">5.0x ROAS</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 text-sm leading-6 text-brand-sky">
          Every channel must earn scale. Unreconciled numbers stay marked pending.
        </CardContent>
      </Card>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="glass-panel flex flex-col gap-4 rounded-3xl px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-xs font-black uppercase text-muted-foreground">
          Injectors Guide HQ
        </p>
        <h1 className="display-title mt-1 text-4xl font-medium leading-none text-primary sm:text-5xl">
          Business Dashboard
        </h1>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="success" className="h-8 px-3">
          All Systems Operational
        </Badge>
        <Badge variant="muted" className="h-8 px-3">
          Updated {dashboardData.lastUpdated}
        </Badge>
        <Button asChild size="sm" className="rounded-full">
          <Link href="/api/dashboard">
            <Bot data-icon="inline-start" />
            API Preview
          </Link>
        </Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="overview"
      className="hero-panel overflow-hidden rounded-[2rem] border border-primary/10 p-6 text-primary-foreground shadow-glass sm:p-8 xl:p-10"
    >
      <div className="grid gap-8 xl:grid-cols-[1.25fr_0.75fr] xl:items-end">
        <div className="max-w-5xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="h-8 px-3">
              Next.js + shadcn app
            </Badge>
            <Badge variant="secondary" className="h-8 px-3">
              Vercel-ready
            </Badge>
          </div>
          <h2 className="display-title text-6xl font-medium leading-[0.9] sm:text-7xl xl:text-8xl">
            The operating system for profitable injector education growth.
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-7 text-brand-sky sm:text-lg">
            A real Chief of Staff dashboard for attribution, content, paid media,
            approvals, blockers, admin controls, and daily feature upgrades.
          </p>
        </div>
        <Card className="rounded-3xl border-white/15 bg-card/10 text-primary-foreground backdrop-blur-2xl">
          <CardHeader>
            <CardDescription className="text-brand-sky">Founder View</CardDescription>
            <CardTitle className="display-title text-5xl font-medium">Traci HQ</CardTitle>
            <CardDescription className="text-brand-sky">
              Clear decisions, live blockers, and growth actions in one place.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {["Attribution first", "Compliance gated", "Founder time protected"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-card/10 p-3">
                <CheckCircle2 aria-hidden="true" className="size-4 text-brand-sky" />
                <span className="text-sm font-semibold">{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function MetricsStrip() {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6" aria-label="North star metrics">
      {dashboardData.metrics.map((metric) => (
        <Card key={metric.label} className="glass-panel rounded-3xl">
          <CardHeader className="p-4">
            <div className="flex items-start justify-between gap-3">
              <CardDescription className="text-xs font-black uppercase">
                {metric.label}
              </CardDescription>
              <StatusBadge status={metric.status} />
            </div>
            <CardTitle className="display-title pt-3 text-4xl font-medium">
              {metric.value}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 text-sm leading-6 text-muted-foreground">
            {metric.note}
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

function AlertCenter() {
  return (
    <section className="grid gap-3 lg:grid-cols-3" aria-label="Alerts and notifications">
      {dashboardData.alerts.map((alert) => (
        <Alert key={alert.title} variant={alert.status === "blocked" ? "destructive" : "brand"} className="glass-panel rounded-3xl">
          <AlertTitle className="flex items-center gap-2">
            <Bell aria-hidden="true" className="size-4" />
            {alert.title}
          </AlertTitle>
          <AlertDescription className="leading-6 text-muted-foreground">
            {alert.detail}
          </AlertDescription>
        </Alert>
      ))}
    </section>
  );
}

function Attribution() {
  return (
    <Card id="attribution" className="glass-panel rounded-[2rem]">
      <CardHeader className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <SectionHeading
          eyebrow="Module 1"
          title="Attribution"
          description="Revenue by channel, with paid attribution held to 7-day click plus 1-day view and Stripe as the final source of truth."
        />
        <div className="flex rounded-full bg-muted p-1">
          {["7d", "30d", "90d", "All"].map((range, index) => (
            <Button key={range} variant={index === 1 ? "default" : "ghost"} size="sm" className="rounded-full">
              {range}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2 rounded-3xl border bg-card/55 p-4">
          <div className="flex h-8 overflow-hidden rounded-full bg-muted">
            {barSegments.map(([label, width, color]) => (
              <div key={label} className={cn("h-full", color)} style={{ width }} title={label} />
            ))}
          </div>
          <div className="flex flex-wrap gap-3 text-xs font-semibold text-muted-foreground">
            {barSegments.map(([label]) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border bg-card/65">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Channel</TableHead>
                <TableHead>Spend</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>ROAS</TableHead>
                <TableHead>CPE</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dashboardData.attribution.map((row) => (
                <TableRow key={row.channel}>
                  <TableCell>
                    <div className="font-semibold">{row.channel}</div>
                    <div className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
                      {row.note}
                    </div>
                  </TableCell>
                  <TableCell>{row.spend}</TableCell>
                  <TableCell>{row.revenue}</TableCell>
                  <TableCell>{row.roas}</TableCell>
                  <TableCell>{row.cpe}</TableCell>
                  <TableCell>
                    <StatusBadge status={row.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

function Decisions() {
  return (
    <Card className="glass-panel rounded-[2rem]">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <SectionHeading
            eyebrow="Module 6"
            title="Decisions"
            description="Founder approvals required before publishing, spending, sensitive access, or medical-claim-adjacent work."
          />
          <Badge variant="warning">{dashboardData.decisions.length} open</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3">
        {dashboardData.decisions.map((decision) => (
          <div key={decision.title} className="rounded-3xl border bg-card/65 p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold leading-tight">{decision.title}</p>
              <StatusBadge status={decision.status} />
            </div>
            <p className="mt-2 text-xs font-bold uppercase text-muted-foreground">
              Owner: {decision.owner}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{decision.detail}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" className="rounded-full">Approve</Button>
              <Button size="sm" variant="secondary" className="rounded-full">Edit</Button>
              <Button size="sm" variant="ghost" className="rounded-full">Reject</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function Pipeline() {
  return (
    <Card id="pipeline" className="glass-panel rounded-[2rem]">
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <SectionHeading
          eyebrow="Module 2"
          title="Content Pipeline"
          description="A Kanban-style production board for blog, YouTube, short-form, paid creative, lifecycle, and PR assets."
        />
        <Button variant="secondary" className="rounded-full">
          <GitPullRequest data-icon="inline-start" />
          Queue Brief
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 overflow-x-auto pb-2 [grid-template-columns:repeat(7,minmax(180px,1fr))]">
          {dashboardData.pipeline.map((lane) => (
            <div key={lane.lane} className="min-h-80 rounded-3xl border bg-primary/5 p-3">
              <h3 className="mb-3 text-xs font-black uppercase text-muted-foreground">
                {lane.lane}
              </h3>
              <div className="flex flex-col gap-3">
                {lane.cards.length === 0 ? (
                  <div className="rounded-2xl border bg-card/65 p-3 text-sm leading-6 text-muted-foreground">
                    Ready for the next approved item.
                  </div>
                ) : (
                  lane.cards.map((card) => (
                    <div key={card.title} className="rounded-2xl border bg-card/80 p-3 shadow-card">
                      <p className="font-semibold leading-snug">{card.title}</p>
                      <p className="mt-2 text-sm leading-5 text-muted-foreground">
                        {card.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {card.tags.map((tag) => (
                          <Badge key={tag} variant="muted">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function GrowthModules() {
  const icons = [CircleDollarSign, Search, Megaphone];

  return (
    <section id="paid" className="grid gap-4 lg:grid-cols-3">
      {dashboardData.modules.map((module, index) => {
        const Icon = icons[index] || Gauge;
        return (
          <Card key={module.title} className="glass-panel rounded-[2rem]">
            <CardHeader>
              <div className="mb-3 grid size-10 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Icon aria-hidden="true" className="size-4" />
              </div>
              <CardDescription>{module.eyebrow}</CardDescription>
              <CardTitle className="display-title text-4xl font-medium">
                {module.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {module.rows.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 border-b pb-3 last:border-b-0 last:pb-0"
                >
                  <span className="text-sm font-semibold">{label}</span>
                  <span className="text-sm text-muted-foreground">{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}

function FeatureUpgrades() {
  return (
    <Card id="features" className="glass-panel rounded-[2rem]">
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <SectionHeading
          eyebrow="Daily Automation"
          title="Feature Upgrades"
          description="A daily COS-IG suggestion queue for improving the dashboard, making it easier to use, and compounding the chief-of-staff ecosystem."
        />
        <Badge variant="success">Daily suggestions ready</Badge>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-2">
        {dashboardData.featureUpgrades.map((feature) => (
          <div key={feature.title} className="rounded-3xl border bg-card/65 p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold leading-tight">{feature.title}</p>
              <StatusBadge status={feature.status} />
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.impact}</p>
            <p className="mt-3 text-xs font-bold uppercase text-muted-foreground">
              Owner: {feature.owner}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" className="rounded-full">Approve</Button>
              <Button size="sm" variant="secondary" className="rounded-full">Deny</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function Admin() {
  return (
    <section id="admin" className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
      <Card className="glass-panel rounded-[2rem]">
        <CardHeader>
          <div className="mb-3 flex items-center gap-2">
            <Badge variant="muted">Admin only</Badge>
            <Badge variant="warning">Auth pending</Badge>
          </div>
          <SectionHeading
            eyebrow="Private Control Room"
            title="Admin"
            description="Protected operations for Traci and approved team members: access, integrations, audit policy, and sensitive business controls."
          />
        </CardHeader>
        <CardContent className="grid gap-3">
          {dashboardData.admin.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 rounded-2xl border bg-card/65 p-3">
              <span className="text-sm font-semibold">{label}</span>
              <span className="text-right text-sm text-muted-foreground">{value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="glass-panel rounded-[2rem]">
        <CardHeader>
          <SectionHeading
            eyebrow="Highest-Leverage Needs"
            title="Blockers"
            description="The same operating memory behind operations/blockers.md, surfaced directly inside the dashboard."
          />
        </CardHeader>
        <CardContent className="grid gap-3">
          {dashboardData.blockers.map((blocker) => (
            <div key={blocker} className="flex items-start gap-3 rounded-2xl border bg-card/65 p-3">
              <KeyRound aria-hidden="true" className="mt-1 size-4 text-primary" />
              <p className="text-sm leading-6 text-muted-foreground">{blocker}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

function ActivityLog() {
  return (
    <Card id="activity" className="glass-panel rounded-[2rem]">
      <CardHeader>
        <SectionHeading
          eyebrow="Module 7"
          title="Activity Log"
          description="Append-only record of autonomous actions, rationale, and outcomes."
        />
      </CardHeader>
      <CardContent className="grid gap-3">
        {dashboardData.activity.map(([time, action, result]) => (
          <div
            key={`${time}-${action}`}
            className="grid gap-3 rounded-3xl border bg-card/65 p-4 sm:grid-cols-[150px_1fr]"
          >
            <div className="text-xs font-black uppercase text-accent">{time}</div>
            <div>
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 aria-hidden="true" className="size-4 text-success" />
                {action}
              </div>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{result}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function DashboardShell() {
  return (
    <div className="grid min-h-screen grid-cols-1 gap-3 p-3 lg:grid-cols-[280px_minmax(0,1fr)] lg:p-4">
      <Sidebar />

      <main className="grid min-w-0 gap-4">
        <Topbar />
        <Hero />
        <MetricsStrip />
        <AlertCenter />

        <section id="chat" className="grid gap-4 xl:grid-cols-[1fr_0.78fr]">
          <Card className="glass-panel overflow-hidden rounded-[2rem]">
            <CosChat />
          </Card>
          <Decisions />
        </section>

        <Attribution />
        <Pipeline />
        <GrowthModules />
        <FeatureUpgrades />
        <Admin />
        <ActivityLog />

        <div className="flex flex-col items-center justify-center gap-2 pb-4 text-center text-xs font-semibold text-muted-foreground sm:flex-row">
          <ShieldCheck aria-hidden="true" className="size-4 text-success" />
          COS-IG Next.js app. Live integrations unlock after access blockers are cleared.
          <Rocket aria-hidden="true" className="size-4 text-primary" />
        </div>
      </main>
    </div>
  );
}
