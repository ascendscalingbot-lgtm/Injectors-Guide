import { NextResponse } from "next/server";
import { dashboardData } from "@/lib/dashboard-data";

type ChatRequest = {
  prompt?: string;
};

function buildAnswer(prompt: string) {
  const lower = prompt.toLowerCase();

  if (lower.includes("blocker") || lower.includes("blocked") || lower.includes("need")) {
    return `Top blockers: ${dashboardData.blockers.slice(0, 4).join("; ")}. I would clear Stripe and Meta first because they unlock revenue truth and paid media control.`;
  }

  if (lower.includes("feature") || lower.includes("upgrade") || lower.includes("suggest")) {
    return `Highest-leverage feature upgrade: ${dashboardData.featureUpgrades[0].title}. It creates a daily approve/deny loop so dashboard improvements can compound without making Traci manage the details.`;
  }

  if (lower.includes("admin") || lower.includes("permission") || lower.includes("auth")) {
    return "Admin mode should be protected before sensitive integrations go live. I recommend Clerk or Supabase Auth, then role-gate Admin, Integrations, and Approval settings.";
  }

  if (lower.includes("roas") || lower.includes("revenue") || lower.includes("attribution")) {
    return "The 5x ROAS floor is built into the dashboard, but live ROAS remains pending until Stripe reconciliation, Meta, Google Ads, GA4, and GSC are connected. I will not report unreconciled numbers as final.";
  }

  if (lower.includes("deploy") || lower.includes("vercel")) {
    return "The app is structured for Vercel as a Next.js App Router project. The old static GitHub Pages dashboard should stay as reference, while Vercel serves the production software dashboard.";
  }

  return "I checked the COS-IG context. The safest next move is to clear production access blockers, keep clinical and paid creative approvals gated, and prioritize dashboard features that improve attribution, approvals, and daily founder visibility.";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as ChatRequest;
  const prompt = body.prompt?.trim() || "";

  return NextResponse.json({
    answer: buildAnswer(prompt),
    source: "cos-ig-static-context",
    productionAiConnected: false
  });
}
