import { NextResponse } from "next/server";
import { findAccountByEmail, publicAccount, setSessionCookie } from "@/lib/ig-auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = String(body?.email || "");
  const password = String(body?.password || "");
  const account = findAccountByEmail(email);

  if (!account || account.password !== password) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const response = NextResponse.json({ account: publicAccount(account) });
  setSessionCookie(response, account.slug);
  return response;
}
