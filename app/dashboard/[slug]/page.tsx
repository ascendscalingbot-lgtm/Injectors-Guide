import { notFound } from "next/navigation";
import { StaticDashboardPage } from "@/components/dashboard/static-dashboard-page";
import { getSessionAccount } from "@/lib/ig-auth";
import { getStaticDashboardPage, isDashboardPageSlug, dashboardPages } from "@/lib/static-dashboard";

export const metadata = {
  title: "Injectors Guide — Command Dashboard"
};

export function generateStaticParams() {
  return dashboardPages.map((slug) => ({ slug }));
}

type DashboardSubPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DashboardSubPage({ params }: DashboardSubPageProps) {
  const { slug } = await params;
  const account = await getSessionAccount();

  if (!isDashboardPageSlug(slug)) {
    notFound();
  }

  if (slug === "admin" && account?.role !== "admin") {
    notFound();
  }

  const dashboard = account ? getStaticDashboardPage(slug) : null;

  return <StaticDashboardPage dashboard={dashboard} account={account} />;
}
