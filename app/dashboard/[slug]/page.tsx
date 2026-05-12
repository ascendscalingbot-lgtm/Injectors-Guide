import { notFound } from "next/navigation";
import { StaticDashboardPage } from "@/components/dashboard/static-dashboard-page";
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

  if (!isDashboardPageSlug(slug)) {
    notFound();
  }

  const dashboard = getStaticDashboardPage(slug);

  return <StaticDashboardPage {...dashboard} />;
}
