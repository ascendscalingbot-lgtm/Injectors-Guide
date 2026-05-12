import { NextResponse } from "next/server";
import { getSessionAccount } from "@/lib/ig-auth";
import { getPrOpportunities, savePrOpportunities, type PrOpportunity } from "@/lib/ig-supabase";

export async function GET() {
  const account = await getSessionAccount();

  if (!account) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const items = await getPrOpportunities();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const account = await getSessionAccount();

  if (!account) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  if (account.role !== "admin") {
    return NextResponse.json({ error: "Only admin accounts can add PR opportunities." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
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
