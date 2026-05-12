import { NextResponse } from "next/server";
import { setSessionCookie, validateDashboardLogin } from "@/lib/ig-auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = String(body?.email || "");
  const password = String(body?.password || "");
  const account = await validateDashboardLogin(email, password);

  if (!account) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const response = NextResponse.json({ account });
  setSessionCookie(response, account.slug);
  return response;
}
