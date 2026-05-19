import { readFile } from "fs/promises";
import path from "path";
import { dashboardData } from "@/lib/dashboard-data";
import type { SessionAccount } from "@/lib/ig-auth";

type ContextFile = {
  label: string;
  filePath: string;
  sourcePath: string;
  maxChars: number;
};

const workspaceRoot = process.cwd();

const contextFiles: ContextFile[] = [
  {
    label: "Master operating prompt",
    filePath: path.join(workspaceRoot, "instructions", "master-prompt.md"),
    sourcePath: "instructions/master-prompt.md",
    maxChars: 14000
  },
  {
    label: "Website and offer context",
    filePath: path.join(workspaceRoot, "context", "website-context.md"),
    sourcePath: "context/website-context.md",
    maxChars: 12000
  },
  {
    label: "Current blockers",
    filePath: path.join(workspaceRoot, "operations", "blockers.md"),
    sourcePath: "operations/blockers.md",
    maxChars: 8000
  },
  {
    label: "Recent activity",
    filePath: path.join(workspaceRoot, "operations", "activity-log.md"),
    sourcePath: "operations/activity-log.md",
    maxChars: 6000
  },
  {
    label: "Daily brief",
    filePath: path.join(workspaceRoot, "operations", "daily-brief-2026-04-27.md"),
    sourcePath: "operations/daily-brief-2026-04-27.md",
    maxChars: 6000
  },
  {
    label: "Feature upgrade queue",
    filePath: path.join(workspaceRoot, "operations", "feature-upgrade-suggestions.md"),
    sourcePath: "operations/feature-upgrade-suggestions.md",
    maxChars: 6000
  }
];

async function readContextFile(file: ContextFile) {
  try {
    const content = await readFile(file.filePath, "utf8");
    return `## ${file.label}\nSource: ${file.sourcePath}\n\n${content.slice(0, file.maxChars)}`;
  } catch {
    return `## ${file.label}\nSource unavailable: ${file.sourcePath}`;
  }
}

function formatDashboardSnapshot() {
  return [
    "## Dashboard Snapshot",
    `Last updated: ${dashboardData.lastUpdated}`,
    dashboardData.floorCopy,
    "",
    "North-star metrics:",
    ...dashboardData.metrics.map((metric) => `- ${metric.label}: ${metric.value} (${metric.note})`),
    "",
    "Open decisions:",
    ...dashboardData.decisions.map((decision) => `- ${decision.title}: ${decision.detail}`),
    "",
    "Known blockers:",
    ...dashboardData.blockers.map((blocker) => `- ${blocker}`)
  ].join("\n");
}

export async function buildCosIgInstructions(account: SessionAccount | null) {
  const docs = await Promise.all(contextFiles.map(readContextFile));

  return [
    "You are COS-IG, the AI Chief of Staff for Injectors Guide inside the private command dashboard.",
    "You are connected through the dashboard chat UI. Answer as a practical operator for Traci and the Injectors Guide team.",
    "",
    "Operating rules:",
    "- Use the trusted business context below as your source of truth.",
    "- Be concise, specific, and action-oriented.",
    "- Separate confirmed facts from recommendations when the distinction matters.",
    "- If live data or credentials are missing, say what is blocked and what access would unlock it.",
    "- Never report unreconciled revenue, ROAS, CPE, or enrollment data as final.",
    "- Do not provide medical dosage guidance, individualized medical advice, guaranteed income, guaranteed hiring outcomes, or guaranteed clinical results.",
    "- Route clinical education, paid creative, pricing changes, medical-claim-adjacent language, and protected-name usage to human approval.",
    "- Keep the Injectors Guide voice warm, direct, high-trust, clinically credible, anti-gatekeeping, and never pushy.",
    "",
    `Current dashboard user: ${account ? `${account.name} (${account.role}, ${account.title})` : "Unknown authenticated user"}`,
    "",
    "<trusted_business_context>",
    formatDashboardSnapshot(),
    "",
    docs.join("\n\n---\n\n"),
    "</trusted_business_context>"
  ].join("\n");
}
