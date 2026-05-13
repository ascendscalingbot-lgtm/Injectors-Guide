import { NextResponse } from "next/server";
import { getSessionAccount } from "@/lib/ig-auth";
import { getPrOpportunities, savePrOpportunities, type PrOpportunity } from "@/lib/ig-supabase";

const editableFields = [
  "title",
  "outlet",
  "contact",
  "journalist",
  "email",
  "angle",
  "docUrl",
  "placementUrl",
  "publication",
  "priority",
  "dueDate",
  "publishedAt",
  "stage",
  "notes"
] as const;

function cleanString(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

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
  const stage = cleanString(body?.stage, "Idea") || "Idea";
  const status = body?.status === "landed" || stage === "Published" ? "landed" : "in_flight";
  const now = new Date().toISOString();

  const item: PrOpportunity = {
    id: crypto.randomUUID(),
    title: cleanString(body?.title, "Untitled PR opportunity") || "Untitled PR opportunity",
    outlet: cleanString(body?.outlet),
    contact: cleanString(body?.contact || body?.meta, "New contact") || "New contact",
    journalist: cleanString(body?.journalist),
    email: cleanString(body?.email),
    angle: cleanString(body?.angle),
    docUrl: cleanString(body?.docUrl),
    placementUrl: cleanString(body?.placementUrl),
    publication: cleanString(body?.publication),
    priority: cleanString(body?.priority, "Medium") || "Medium",
    dueDate: cleanString(body?.dueDate),
    publishedAt: cleanString(body?.publishedAt),
    stage,
    notes: cleanString(body?.notes),
    status,
    createdBy: account.slug,
    createdAt: now,
    updatedAt: now
  };

  const items = [item, ...existing];
  await savePrOpportunities(items);

  return NextResponse.json({ item, items });
}

export async function PATCH(request: Request) {
  const account = await getSessionAccount();

  if (!account) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const id = cleanString(body?.id);

  if (!id) {
    return NextResponse.json({ error: "Missing PR opportunity id." }, { status: 400 });
  }

  const existing = await getPrOpportunities();
  const current = existing.find((item) => item.id === id);

  if (!current) {
    return NextResponse.json({ error: "PR opportunity not found." }, { status: 404 });
  }

  const now = new Date().toISOString();
  const isAdmin = account.role === "admin";
  const next: PrOpportunity = { ...current, updatedAt: now };

  if (body?.action === "approve") {
    next.stage = "Approved";
    next.approvedAt = now;
    next.approvedBy = account.slug;
  } else if (body?.action === "request_changes") {
    next.stage = "Changes Requested";
    next.notes = cleanString(body?.notes, next.notes) || next.notes;
  } else if (isAdmin) {
    for (const field of editableFields) {
      if (field in (body || {})) {
        (next as Record<string, unknown>)[field] = cleanString(body?.[field]);
      }
    }

    if (body?.status === "landed" || next.stage === "Published") next.status = "landed";
    if (body?.status === "in_flight") next.status = "in_flight";
  } else {
    return NextResponse.json({ error: "Only admin accounts can edit PR opportunities." }, { status: 403 });
  }

  const items = existing.map((item) => (item.id === id ? next : item));
  await savePrOpportunities(items);

  return NextResponse.json({ item: next, items });
}
