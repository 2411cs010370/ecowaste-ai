import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Leaf, Percent, Recycle, ScanSearch } from "lucide-react";
import { PageShell, SectionTitle, StatCard } from "@/components/eco/Section";
import { CategoryBar, DistributionPie } from "@/components/eco/Charts";
import { RecentTable } from "@/components/eco/RecentTable";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — EcoWaste AI" },
      { name: "description", content: "Summary of waste detections, recyclable, organic and hazardous waste, and recycling rate." },
      { property: "og:title", content: "Dashboard — EcoWaste AI" },
      { property: "og:description", content: "Live overview of AI waste detection activity." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <PageShell>
      <SectionTitle eyebrow="Overview" title="Waste Dashboard" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard icon={<ScanSearch className="size-4" />} label="Total Detected" value="10,000" sub="+12% this month" />
        <StatCard icon={<Recycle className="size-4" />} label="Recyclable" value="7,410" sub="74% of total" />
        <StatCard icon={<Leaf className="size-4" />} label="Organic" value="1,960" sub="Composted" />
        <StatCard icon={<AlertTriangle className="size-4" />} label="Hazardous" value="630" sub="Incl. e-waste" />
        <StatCard icon={<Percent className="size-4" />} label="Recycling Rate" value="80%" sub="+6 pts" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <DistributionPie />
        <CategoryBar />
      </div>
      <div className="mt-6"><RecentTable /></div>
    </PageShell>
  );
}
