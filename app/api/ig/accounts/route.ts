import { NextResponse } from "next/server";
import { getSessionAccount } from "@/lib/ig-auth";
import { getIgAccounts } from "@/lib/ig-supabase";

export async function GET() {
  const currentAccount = await getSessionAccount();

  if (!currentAccount) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const accounts = currentAccount.role === "admin" ? await getIgAccounts() : [currentAccount];

  return NextResponse.json({ accounts, currentAccount });
}
