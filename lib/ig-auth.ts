import { createHash } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getIgAccounts } from "@/lib/ig-supabase";

export type AccountSlug = "traci-andreason" | "shayan-samimi";
export type AccountRole = "client" | "admin";

export type SessionAccount = {
  slug: AccountSlug;
  email: string;
  name: string;
  role: AccountRole;
  title: string;
  imageUrl: string;
};

export const IG_SESSION_COOKIE = "ig_dashboard_session";

export function publicAccount(account: SessionAccount): SessionAccount {
  return {
    slug: account.slug,
    email: account.email,
    name: account.name,
    role: account.role,
    title: account.title,
    imageUrl: account.imageUrl
  };
}

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export async function validateDashboardLogin(email: string, password: string) {
  const normalized = email.trim().toLowerCase();
  const accounts = await getIgAccounts();
  const account = accounts.find((item) => item.email.toLowerCase() === normalized);

  if (!account?.passwordHash || sha256(password) !== account.passwordHash) {
    return null;
  }

  return publicAccount(account);
}

export async function getSessionAccount(): Promise<SessionAccount | null> {
  const cookieStore = await cookies();
  const slug = cookieStore.get(IG_SESSION_COOKIE)?.value as AccountSlug | undefined;
  if (!slug) return null;

  const accounts = await getIgAccounts();
  const account = accounts.find((item) => item.slug === slug);
  return account ? publicAccount(account) : null;
}

export function setSessionCookie(response: NextResponse, slug: AccountSlug) {
  response.cookies.set(IG_SESSION_COOKIE, slug, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.VERCEL === "1",
    path: "/",
    maxAge: 60 * 60 * 12
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(IG_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.VERCEL === "1",
    path: "/",
    maxAge: 0
  });
}
