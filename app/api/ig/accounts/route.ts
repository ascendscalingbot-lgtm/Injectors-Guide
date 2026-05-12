import { NextResponse } from "next/server";
import { getIgAccount, getIgAccounts } from "@/lib/ig-supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const selected = searchParams.get("account") || "traci-andreason";
  const accounts = await getIgAccounts();
  const currentAccount = await getIgAccount(selected);

  return NextResponse.json({ accounts, currentAccount });
}
