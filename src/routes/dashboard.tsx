import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Leaf,
  Percent,
  Recycle,
  ScanSearch,
  Lock,
  ShieldCheck,
  Award,
  Sparkles,
  Camera,
  LogIn,
  KeyRound,
  ArrowRight,
} from "lucide-react";
import { PageShell, SectionTitle, StatCard } from "@/components/eco/Section";
import { CategoryBar, DistributionPie } from "@/components/eco/Charts";
import { RecentTable } from "@/components/eco/RecentTable";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard (Protected) — EcoWaste AI" },
      { name: "description", content: "Section 4.2.5 Protected Dashboard: Personalized waste metrics and AI detection logs." },
      { property: "og:title", content: "Dashboard — EcoWaste AI" },
      { property: "og:description", content: "Live overview of AI waste detection activity." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const auth = useAuth();

  // If not logged in, render the Section 4.2.5 Access Restriction Guard
  if (!auth.isAuthenticated || !auth.user) {
    return (
      <PageShell>
        <div className="mx-auto max-w-2xl py-12 text-center">
          <div className="mx-auto flex size-20 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20">
            <Lock className="size-10" />
          </div>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
            <ShieldCheck className="size-3.5" />
            Section 4.2.5 • Access Restricted
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            JWT Authentication Required
          </h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            This dashboard contains protected personal waste tracking metrics, historical detection logs, and personalized disposal recommendations. Access requires a valid signed JSON Web Token (JWT).
          </p>

          <div className="glass mt-8 p-6 text-left space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Why is this page protected?</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              As outlined in <strong>Section 4.2.5 (Authentication Module)</strong>, the system generates a secure cryptographic token when a user registers or logs in. Unauthenticated users cannot access sensitive activity logs or personalize model suggestion outcomes.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row pt-2">
              <Button asChild className="flex-1">
                <Link to="/login" search={{ redirect: "/dashboard" }}>
                  <LogIn className="mr-2 size-4" /> Sign In with JWT
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link to="/login" search={{ mode: "register", redirect: "/dashboard" }}>
                  Create Free Account
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  // Authenticated View
  const user = auth.user;
  const ecoRank =
    user.ecoPoints >= 3000
      ? "🌟 Eco Champion"
      : user.ecoPoints >= 1500
      ? "🥈 Green Guardian"
      : "🌱 Eco Pioneer";

  return (
    <PageShell>
      {/* Personalized Welcome Banner */}
      <div className="glass relative overflow-hidden p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/20 text-3xl shadow-xs">
              {user.avatar || "👤"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  ● JWT Session Active
                </span>
                <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                  {user.role}
                </span>
              </div>
              <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                Welcome back, {user.name}!
              </h1>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Personalized waste metrics • Verified User ID: <code className="font-mono text-primary">{user.id}</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild size="sm">
              <Link to="/detect">
                <Camera className="mr-2 size-4" /> Scan Waste (+25 pts)
              </Link>
            </Button>
            {auth.isAdmin && (
              <Button asChild variant="outline" size="sm">
                <Link to="/admin">Admin Panel</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* User Personalized Metrics */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="glass p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">My EcoPoints Balance</p>
            <Sparkles className="size-4 text-emerald-500" />
          </div>
          <p className="mt-2 text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            🌿 {user.ecoPoints.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Earn 25 pts for every verified scan</p>
        </div>

        <div className="glass p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">My Total Scans</p>
            <ScanSearch className="size-4 text-primary" />
          </div>
          <p className="mt-2 text-3xl font-extrabold">{user.scansCount} items</p>
          <p className="mt-1 text-xs text-muted-foreground">Classified with Deep Learning</p>
        </div>

        <div className="glass p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Eco Tier Status</p>
            <Award className="size-4 text-amber-500" />
          </div>
          <p className="mt-2 text-2xl font-bold">{ecoRank}</p>
          <p className="mt-1 text-xs text-muted-foreground">Top 5% sustainability contributor</p>
        </div>
      </div>

      {/* User's Recent Scans if available */}
      {user.recentScans && user.recentScans.length > 0 && (
        <div className="glass mt-6 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-base">Your Personal Scan History</h3>
            <span className="text-xs text-muted-foreground">Stored securely in your user profile</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[580px] text-sm">
              <thead className="text-left text-muted-foreground text-xs uppercase">
                <tr>
                  <th className="pb-3">Waste Item</th>
                  <th>Category</th>
                  <th>Model Confidence</th>
                  <th>Points</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {user.recentScans.map((scan) => (
                  <tr key={scan.id} className="transition-colors hover:bg-accent/40">
                    <td className="py-2.5 font-medium">{scan.wasteType}</td>
                    <td>
                      <span className="rounded-full bg-accent px-2 py-0.5 text-xs">
                        {scan.category}
                      </span>
                    </td>
                    <td>
                      <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
                        {scan.confidence}%
                      </span>
                    </td>
                    <td className="text-emerald-600 font-semibold text-xs">+{scan.pointsEarned} pts</td>
                    <td className="text-xs text-muted-foreground">{scan.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Global Analytics Overview */}
      <div className="mt-10">
        <SectionTitle eyebrow="Facility & Global Feed" title="Overall System Waste Analytics" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
        <div className="mt-6">
          <RecentTable />
        </div>
      </div>
    </PageShell>
  );
}
