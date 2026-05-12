const SUPABASE_URL = process.env.SUPABASE_URL || "https://cmtvqqfofegbzzfmrvbv.supabase.co";
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtdHZxcWZvZmVnYnp6Zm1ydmJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MzIwMzUsImV4cCI6MjA4NTQwODAzNX0.cEEUBEFnew06U8CtL0eB1hs1kAGN5Frmie1fybX1Dzc";

export type IgAccountRole = "admin" | "client";

export type IgAccount = {
  slug: string;
  name: string;
  role: IgAccountRole;
  title: string;
};

export type PrOpportunity = {
  id: string;
  title: string;
  contact: string;
  stage: string;
  notes: string;
  status: "in_flight" | "landed";
  createdBy: string;
  createdAt: string;
};

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json"
};

const accountsFallback: IgAccount[] = [
  { slug: "traci-andreason", name: "Traci Andreason", role: "client", title: "Founder and CEO" },
  { slug: "shayan-samimi", name: "Shayan Samimi", role: "admin", title: "Ascend Scaling" }
];

const prFallback: PrOpportunity[] = [
  {
    id: "beauty-independent-placement",
    title: "Beauty Independent feature",
    contact: "Editorial team",
    stage: "Published",
    notes: "PR placement completed for Injectors Guide.",
    status: "landed",
    createdBy: "shayan-samimi",
    createdAt: "2026-05-12T00:00:00.000Z"
  },
  {
    id: "nurse-org-placement",
    title: "Nurse.org placement",
    contact: "Editorial team",
    stage: "Published",
    notes: "PR placement completed for Injectors Guide.",
    status: "landed",
    createdBy: "shayan-samimi",
    createdAt: "2026-05-12T00:00:00.000Z"
  }
];

async function getDoc<T>(slug: string, fallback: T): Promise<T> {
  const url = `${SUPABASE_URL}/rest/v1/docs?slug=eq.${encodeURIComponent(slug)}&select=body_md`;
  const response = await fetch(url, { headers, cache: "no-store" });

  if (!response.ok) return fallback;

  const rows = await response.json();
  const body = rows?.[0]?.body_md;
  if (!body) return fallback;

  try {
    return JSON.parse(body) as T;
  } catch {
    return fallback;
  }
}

async function upsertDoc(slug: string, title: string, body: unknown) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/docs`, {
    method: "POST",
    headers: { ...headers, Prefer: "return=representation,resolution=merge-duplicates" },
    body: JSON.stringify({ slug, title, body_md: JSON.stringify(body, null, 2) })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Supabase upsert failed");
  }

  return response.json();
}

export async function getIgAccounts() {
  return getDoc<IgAccount[]>("injectors-guide/accounts", accountsFallback);
}

export async function getIgAccount(slug = "traci-andreason") {
  const accounts = await getIgAccounts();
  return accounts.find((account) => account.slug === slug) || accounts[0];
}

export async function getPrOpportunities() {
  return getDoc<PrOpportunity[]>("injectors-guide/pr-opportunities", prFallback);
}

export async function savePrOpportunities(items: PrOpportunity[]) {
  return upsertDoc("injectors-guide/pr-opportunities", "Injectors Guide PR Opportunities", items);
}
