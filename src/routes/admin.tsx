import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Activity, BarChart3, Database, Home, ScrollText, Users } from "lucide-react";
import { StatCard } from "@/components/eco/Section";
import { EfficiencyLine, MonthlyTrend } from "@/components/eco/Charts";
import { RecentTable } from "@/components/eco/RecentTable";
import { metrics, users, categoryData } from "@/lib/demo-data";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — EcoWaste AI" },
      { name: "description", content: "Manage users, detection logs, datasets and AI model performance." },
      { property: "og:title", content: "Admin Panel — EcoWaste AI" },
      { property: "og:description", content: "EcoWaste AI administration dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

const TABS = [
  { id: "users", label: "User Management", icon: Users },
  { id: "logs", label: "Detection Logs", icon: ScrollText },
  { id: "analytics", label: "Analytics Monitoring", icon: BarChart3 },
  { id: "dataset", label: "Dataset Management", icon: Database },
  { id: "model", label: "Model Performance", icon: Activity },
] as const;

function Admin() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("users");
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="glass m-3 flex flex-col gap-1 p-4 md:w-64 md:shrink-0">
        <Link to="/" className="mb-4 px-2 text-lg font-bold">♻ <span className="eco-gradient-text">EcoWaste AI</span></Link>
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${tab === t.id ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
          >
            <t.icon className="size-4" /> {t.label}
          </button>
        ))}
        <Link to="/" className="mt-auto flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent"><Home className="size-4" /> Back to site</Link>
      </aside>
      <main className="flex-1 p-5">
        <h1 className="text-2xl font-bold">{TABS.find((t) => t.id === tab)?.label}</h1>
        <div className="mt-6 space-y-6">
          {tab === "users" && (
            <div className="glass overflow-x-auto p-5">
              <table className="w-full min-w-[520px] text-sm">
                <thead className="text-left text-muted-foreground"><tr><th className="pb-3">Name</th><th>Email</th><th>Role</th><th>Scans</th></tr></thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.email} className="border-t border-border"><td className="py-3 font-medium">{u.name}</td><td>{u.email}</td><td><span className="rounded-full bg-accent px-2 py-0.5 text-xs">{u.role}</span></td><td>{u.scans}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {tab === "logs" && <RecentTable />}
          {tab === "analytics" && (<><div className="grid gap-4 sm:grid-cols-3"><StatCard icon={<Activity className="size-4" />} label="API calls today" value="1,284" /><StatCard icon={<Users className="size-4" />} label="Active users" value="342" /><StatCard icon={<BarChart3 className="size-4" />} label="Avg latency" value="420 ms" /></div><MonthlyTrend /></>)}
          {tab === "dataset" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categoryData.map((c) => (
                <div key={c.name} className="glass lift p-5"><p className="text-sm text-muted-foreground">{c.name}</p><p className="mt-1 text-2xl font-bold">{c.value.toLocaleString()}</p><p className="text-xs text-primary">images</p></div>
              ))}
            </div>
          )}
          {tab === "model" && (<><div className="grid gap-4 sm:grid-cols-4">{metrics.map((m) => <StatCard key={m.label} icon={<Activity className="size-4" />} label={m.label} value={`${m.value}%`} />)}</div><EfficiencyLine /></>)}
        </div>
      </main>
    </div>
  );
}
