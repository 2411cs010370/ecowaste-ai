import { createFileRoute } from "@tanstack/react-router";
import { PageShell, SectionTitle } from "@/components/eco/Section";
import { CategoryBar, DistributionPie, EfficiencyLine, MonthlyTrend } from "@/components/eco/Charts";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — EcoWaste AI" },
      { name: "description", content: "Waste distribution, category comparison, monthly trends and recycling efficiency charts." },
      { property: "og:title", content: "Analytics — EcoWaste AI" },
      { property: "og:description", content: "Interactive charts of AI waste detection and recycling performance." },
    ],
  }),
  component: Analytics,
});

function Analytics() {
  return (
    <PageShell>
      <SectionTitle eyebrow="Insights" title="Analytics" desc="Trends across 10,000+ processed waste images." />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <MonthlyTrend />
        <EfficiencyLine />
        <DistributionPie />
        <CategoryBar />
      </div>
    </PageShell>
  );
}
