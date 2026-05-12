import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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

type AccountConfig = SessionAccount & {
  passwordEnv: string;
};

export const IG_SESSION_COOKIE = "ig_dashboard_session";

export const TEMP_ACCOUNTS: Record<AccountSlug, AccountConfig> = {
  "traci-andreason": {
    slug: "traci-andreason",
    email: "traci@injectorsguide.co",
    passwordEnv: "IG_DASHBOARD_PASSWORD_TRACI",
    name: "Traci Andreason",
    role: "client",
    title: "Founder and CEO",
    imageUrl: "/traci-jason.png"
  },
  "shayan-samimi": {
    slug: "shayan-samimi",
    email: "shayan@ascendscaling.com",
    passwordEnv: "IG_DASHBOARD_PASSWORD_SHAYAN",
    name: "Shayan Samimi",
    role: "admin",
    title: "Growth Partner",
    imageUrl: "/shayan-samimi.jpg"
  }
};

export function publicAccount(account: AccountConfig): SessionAccount {
  return {
    slug: account.slug,
    email: account.email,
    name: account.name,
    role: account.role,
    title: account.title,
    imageUrl: account.imageUrl
  };
}

export function findAccountByEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  return Object.values(TEMP_ACCOUNTS).find((account) => account.email.toLowerCase() === normalized) || null;
}

export function isValidPassword(account: AccountConfig, password: string) {
  const configuredPassword = process.env[account.passwordEnv];
  return Boolean(configuredPassword) && password === configuredPassword;
}

export async function getSessionAccount(): Promise<SessionAccount | null> {
  const cookieStore = await cookies();
  const slug = cookieStore.get(IG_SESSION_COOKIE)?.value as AccountSlug | undefined;
  if (!slug || !TEMP_ACCOUNTS[slug]) return null;
  return publicAccount(TEMP_ACCOUNTS[slug]);
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
