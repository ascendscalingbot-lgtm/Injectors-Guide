import { StaticDashboardPage } from "@/components/dashboard/static-dashboard-page";
import { getStaticDashboardPage } from "@/lib/static-dashboard";

export const metadata = {
  title: "Injectors Guide — Command Dashboard"
};

export default function HomePage() {
  const dashboard = getStaticDashboardPage("index");

  return <StaticDashboardPage {...dashboard} />;
}
