import { NextResponse } from "next/server";
import { getIgAccount, getPrOpportunities, savePrOpportunities, type PrOpportunity } from "@/lib/ig-supabase";

export async function GET() {
  const items = await getPrOpportunities();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const account = await getIgAccount(body?.account || "traci-andreason");

  if (account.role !== "admin") {
    return NextResponse.json({ error: "Only admin accounts can add PR opportunities." }, { status: 403 });
  }

  const existing = await getPrOpportunities();
  const item: PrOpportunity = {
    id: crypto.randomUUID(),
    title: String(body?.title || "Untitled PR opportunity"),
    contact: String(body?.contact || body?.meta || "New contact"),
    stage: String(body?.stage || "Idea"),
    notes: String(body?.notes || ""),
    status: body?.status === "landed" ? "landed" : "in_flight",
    createdBy: account.slug,
    createdAt: new Date().toISOString()
  };

  const items = [item, ...existing];
  await savePrOpportunities(items);

  return NextResponse.json({ item, items });
}
