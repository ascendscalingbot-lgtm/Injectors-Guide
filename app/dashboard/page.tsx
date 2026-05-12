import { StaticDashboardPage } from "@/components/dashboard/static-dashboard-page";
import { getSessionAccount } from "@/lib/ig-auth";
import { getStaticDashboardPage } from "@/lib/static-dashboard";

export const metadata = {
  title: "Injectors Guide — Command Dashboard"
};

export default async function DashboardPage() {
  const account = await getSessionAccount();
  const dashboard = account ? getStaticDashboardPage("index") : null;

  return <StaticDashboardPage dashboard={dashboard} account={account} />;
}
