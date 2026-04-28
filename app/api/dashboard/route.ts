import { NextResponse } from "next/server";
import { dashboardData } from "@/lib/dashboard-data";

export function GET() {
  return NextResponse.json({
    data: dashboardData,
    source: "workspace-static-foundation",
    reconciled: false
  });
}
