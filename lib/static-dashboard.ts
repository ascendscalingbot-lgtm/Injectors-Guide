import { readFileSync } from "fs";
import path from "path";

export const dashboardPages = [
  "ai-chat",
  "attribution",
  "pipeline",
  "seo",
  "paid-media",
  "pr",
  "decisions",
  "activity",
  "admin"
] as const;

export type DashboardPageSlug = (typeof dashboardPages)[number];

type ParsedDashboardHtml = {
  css: string;
  html: string;
  script: string;
};

function rewriteDashboardRoutes(source: string) {
  return source
    .replaceAll("/Injectors-Guide/dashboard/ai-chat.html", "/dashboard/ai-chat")
    .replaceAll("/Injectors-Guide/dashboard/attribution.html", "/dashboard/attribution")
    .replaceAll("/Injectors-Guide/dashboard/pipeline.html", "/dashboard/pipeline")
    .replaceAll("/Injectors-Guide/dashboard/seo.html", "/dashboard/seo")
    .replaceAll("/Injectors-Guide/dashboard/paid-media.html", "/dashboard/paid-media")
    .replaceAll("/Injectors-Guide/dashboard/pr.html", "/dashboard/pr")
    .replaceAll("/Injectors-Guide/dashboard/decisions.html", "/dashboard/decisions")
    .replaceAll("/Injectors-Guide/dashboard/activity.html", "/dashboard/activity")
    .replaceAll("/Injectors-Guide/dashboard/admin.html", "/dashboard/admin")
    .replaceAll("/Injectors-Guide/dashboard/", "/dashboard");
}

export function getStaticDashboardPage(slug: DashboardPageSlug | "index" = "index"): ParsedDashboardHtml {
  const filename = slug === "index" ? "index.html" : `${slug}.html`;
  const filePath = path.join(process.cwd(), "dashboard", filename);
  const raw = rewriteDashboardRoutes(readFileSync(filePath, "utf8"));

  const css = raw.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? "";
  const body = raw.match(/<body>([\s\S]*?)<\/body>/)?.[1] ?? raw;
  const script = body.match(/<script>([\s\S]*?)<\/script>/)?.[1] ?? "";
  const html = body.replace(/<script>[\s\S]*?<\/script>/, "").trim();

  return { css, html, script };
}

export function isDashboardPageSlug(slug: string): slug is DashboardPageSlug {
  return (dashboardPages as readonly string[]).includes(slug);
}
