import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export default function DailyBriefPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-4 p-4 sm:p-8">
      <Button asChild variant="secondary" className="w-fit">
        <Link href="/">
          <ArrowLeft data-icon="inline-start" />
          Back to dashboard
        </Link>
      </Button>
      <Card className="glass-panel rounded-3xl">
        <CardHeader>
          <CardDescription>April 27, 2026</CardDescription>
          <CardTitle className="display-title text-5xl font-medium">
            Injectors Guide Daily Brief
          </CardTitle>
          <CardDescription>
            Foundation operating packet created while live credentials remain blocked.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 text-sm leading-7 text-muted-foreground">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">Revenue & Attribution</h2>
            <p>
              Live reporting is blocked until Stripe, Meta, Google Ads, GA4, and GSC access
              are connected. No ROAS, CPE, or enrollment numbers should be reported as final
              until Stripe reconciliation is active.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">Today's Outputs</h2>
            <ul className="grid list-disc gap-2 pl-5">
              <li>First SEO brief: How to Become an Aesthetic Injector.</li>
              <li>Three short-form scripts covering burnout, anti-gatekeeping, and hiring support.</li>
              <li>Five ad creative concepts queued for founder approval.</li>
              <li>PR pitch angle drafted for Utah business and nursing career publications.</li>
              <li>Ten keyword candidates logged by intent and rough difficulty.</li>
            </ul>
          </section>
          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">Decisions Needed</h2>
            <ol className="grid list-decimal gap-2 pl-5">
              <li>Provide production repo or confirm this folder should become the new repo.</li>
              <li>Provide API credentials listed in the blocker log.</li>
              <li>Confirm ESP: Klaviyo or ConvertKit.</li>
              <li>Approve first SEO brief and ad concept directions.</li>
              <li>Provide approved press kit assets.</li>
            </ol>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
