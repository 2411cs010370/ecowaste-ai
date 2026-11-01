import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Activity, BarChart3, Database, Home, ScrollText, Users, ShieldAlert, KeyRound, Lock, CheckCircle2 } from "lucide-react";
import { StatCard } from "@/components/eco/Section";
import { EfficiencyLine, MonthlyTrend } from "@/components/eco/Charts";
import { RecentTable } from "@/components/eco/RecentTable";
import { metrics, categoryData } from "@/lib/demo-data";
import { useAuth, type User } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel (RBAC Protected) — EcoWaste AI" },
      { name: "description", content: "Section 4.2.5 Protected Admin: Manage users, detection logs, datasets and AI model performance." },
      { property: "og:title", content: "Admin Panel — EcoWaste AI" },
      { property: "og:description", content: "EcoWaste AI administration dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

const TABS = [
  { id: "users", label: "User Management (RBAC)", icon: Users },
  { id: "logs", label: "Detection Logs", icon: ScrollText },
  { id: "analytics", label: "Analytics Monitoring", icon: BarChart3 },
  { id: "dataset", label: "Dataset Management", icon: Database },
  { id: "model", label: "Model Performance", icon: Activity },
] as const;

function Admin() {
  const auth = useAuth();
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("users");

  // Access Control Guard: Requires authentication AND Admin role
  if (!auth.isAuthenticated || !auth.user || auth.user.role !== "Admin") {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="glass max-w-md w-full p-8 text-center space-y-5">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
            <ShieldAlert className="size-8" />
          </div>
          <div>
            <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
              Section 4.2.5 Access Denied (RBAC)
            </span>
            <h1 className="mt-3 text-2xl font-bold">Admin Privileges Required</h1>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              {auth.isAuthenticated
                ? `You are currently logged in as "${auth.user.name}" with role "${auth.user.role}". Only users with the "Admin" role claim in their verified JWT token can access the system administration panel.`
                : "You must sign in with a verified Administrator JWT token to access user management, neural model metrics, and system datasets."}
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <Button asChild className="w-full">
              <Link to="/login" search={{ redirect: "/admin" }}>
                <KeyRound className="mr-2 size-4" /> Sign In as Administrator
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full">
              <Link to="/">Back to Homepage</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Retrieve dynamic user accounts from user database
  const storedUsersRaw = typeof window !== "undefined" ? localStorage.getItem("ecowaste_registered_users_db") : null;
  const systemUsers: User[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [auth.user];

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="glass m-3 flex flex-col gap-1 p-4 md:w-64 md:shrink-0">
        <Link to="/" className="mb-2 px-2 text-lg font-bold">
          ♻ <span className="eco-gradient-text">EcoWaste AI</span>
        </Link>
        <div className="mb-4 px-2 py-1.5 rounded-md bg-primary/10 border border-primary/20 text-xs">
          <p className="font-semibold text-primary truncate">Admin: {auth.user.name}</p>
          <p className="text-[10px] text-muted-foreground">JWT Token: HS256 Verified</p>
        </div>
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              tab === t.id ? "bg-primary text-primary-foreground font-medium" : "hover:bg-accent"
            }`}
          >
            <t.icon className="size-4" /> {t.label}
          </button>
        ))}
        <Link to="/" className="mt-auto flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent">
          <Home className="size-4" /> Back to site
        </Link>
      </aside>
      <main className="flex-1 p-5 lg:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <h1 className="text-2xl font-bold">{TABS.find((t) => t.id === tab)?.label}</h1>
          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            🔒 RBAC Auth: Admin Mode
          </span>
        </div>
        <div className="mt-6 space-y-6">
          {tab === "users" && (
            <div className="glass overflow-x-auto p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-base">Active Registered Users & Roles</h3>
                  <p className="text-xs text-muted-foreground">
                    All accounts authenticated via RFC 7519 JWT tokens with assigned role permissions
                  </p>
                </div>
                <span className="text-xs text-primary font-semibold">
                  {systemUsers.length} Users Enrolled
                </span>
              </div>
              <table className="w-full min-w-[580px] text-sm">
                <thead className="text-left text-muted-foreground text-xs uppercase">
                  <tr>
                    <th className="pb-3">User</th>
                    <th>Email Address</th>
                    <th>Role (RBAC)</th>
                    <th>EcoPoints</th>
                    <th>Scans</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {systemUsers.map((u) => (
                    <tr key={u.id || u.email} className="transition-colors hover:bg-accent/40">
                      <td className="py-3 font-medium flex items-center gap-2">
                        <span>{u.avatar || "👤"}</span>
                        <span>{u.name}</span>
                      </td>
                      <td className="text-muted-foreground text-xs">{u.email}</td>
                      <td>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                            u.role === "Admin"
                              ? "bg-primary/20 text-primary"
                              : u.role === "Waste Manager"
                              ? "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                              : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="text-emerald-600 font-semibold text-xs">🌿 {u.ecoPoints || 0}</td>
                      <td className="font-mono text-xs">{u.scansCount || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {tab === "logs" && <RecentTable />}
          {tab === "analytics" && (
            <>
              <div className="grid gap-4 sm:grid-cols-3">
                <StatCard icon={<Activity className="size-4" />} label="API calls today" value="1,284" />
                <StatCard icon={<Users className="size-4" />} label="Active users" value={String(systemUsers.length + 340)} />
                <StatCard icon={<BarChart3 className="size-4" />} label="Avg latency" value="420 ms" />
              </div>
              <MonthlyTrend />
            </>
          )}
          {tab === "dataset" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categoryData.map((c) => (
                <div key={c.name} className="glass lift p-5">
                  <p className="text-sm text-muted-foreground">{c.name}</p>
                  <p className="mt-1 text-2xl font-bold">{c.value.toLocaleString()}</p>
                  <p className="text-xs text-primary">images</p>
                </div>
              ))}
            </div>
          )}
          {tab === "model" && (
            <>
              <div className="grid gap-4 sm:grid-cols-4">
                {metrics.map((m) => (
                  <StatCard key={m.label} icon={<Activity className="size-4" />} label={m.label} value={`${m.value}%`} />
                ))}
              </div>
              <EfficiencyLine />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
