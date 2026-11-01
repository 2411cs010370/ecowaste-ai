import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import {
  ShieldCheck,
  KeyRound,
  UserCheck,
  Sparkles,
  Lock,
  Mail,
  User,
  LogOut,
  ArrowRight,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageShell } from "@/components/eco/Section";
import { useAuth, type UserRole } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>) => ({
    mode: s["mode"] === "register" ? "register" : undefined,
    redirect: typeof s["redirect"] === "string" ? s["redirect"] : undefined,
  }) as { mode?: "register"; redirect?: string },
  head: () => ({
    meta: [
      { title: "Authentication (JWT) — EcoWaste AI" },
      { name: "description", content: "Section 4.2.5 JWT Authentication & Access Control Module for EcoWaste AI." },
      { property: "og:title", content: "Authentication — EcoWaste AI" },
      { property: "og:description", content: "Secure token-based login and user management." },
    ],
  }),
  component: Login,
});

const loginSchema = z.object({
  email: z.string().trim().email("Please provide a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Please provide a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["Eco Citizen", "Waste Manager", "Admin", "Recycler"]),
});

function Login() {
  const { mode, redirect } = Route.useSearch();
  const [isRegister, setIsRegister] = useState(mode === "register");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Eco Citizen" as UserRole,
  });

  const nav = useNavigate();
  const auth = useAuth();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse({ email: form.email, password: form.password });
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Invalid credentials");
      return;
    }

    const res = auth.login(form.email, form.password);
    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(`Welcome back, ${res.user?.name}! (JWT Token issued)`);
    nav({ to: redirect || "/dashboard" });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = registerSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Invalid registration details");
      return;
    }

    const res = auth.register({
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role,
    });

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(`Welcome to EcoWaste AI! JWT session token generated.`);
    nav({ to: redirect || "/dashboard" });
  };

  const quickDemoLogin = (email: string, pass: string) => {
    const res = auth.login(email, pass);
    if (res.success) {
      toast.success(`Logged in as ${res.user?.name} (${res.user?.role})`);
      nav({ to: redirect || "/dashboard" });
    }
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl py-6">
        {/* Academic / Project Review Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <ShieldCheck className="size-4" />
            Section 4.2.5 • JWT Authentication & Access Control Module
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {auth.isAuthenticated ? "Active Session Overview" : isRegister ? "Create User Account" : "Secure User Login"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            RFC 7519 JSON Web Token (JWT) cryptographic identity verification with Role-Based Access Control (RBAC).
          </p>
        </div>

        {auth.isAuthenticated && auth.user ? (
          <div className="glass mx-auto max-w-xl space-y-6 p-8 text-center">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-primary/20 text-4xl">
              {auth.user.avatar || "👤"}
            </div>
            <div>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                ● JWT Authenticated Session Active
              </span>
              <h2 className="mt-3 text-2xl font-bold">{auth.user.name}</h2>
              <p className="text-sm text-muted-foreground">{auth.user.email}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 border-y border-border py-4 text-left">
              <div>
                <p className="text-xs text-muted-foreground">Assigned Role</p>
                <p className="font-semibold text-primary">{auth.user.role}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Eco Points</p>
                <p className="font-semibold text-emerald-600 dark:text-emerald-400">🌿 {auth.user.ecoPoints}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Scans Verified</p>
                <p className="font-semibold">{auth.user.scansCount} scans</p>
              </div>
            </div>

            {/* Token inspection snippet */}
            <div className="rounded-lg bg-black/5 p-3 text-left font-mono text-xs dark:bg-white/5">
              <p className="text-muted-foreground">Token Scheme: Bearer HS256 (RFC 7519)</p>
              <p className="truncate text-primary">Token: {auth.token}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="flex-1">
                <Link to="/dashboard">
                  Proceed to Dashboard <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              {auth.isAdmin && (
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/admin">Admin Panel</Link>
                </Button>
              )}
              <Button
                variant="destructive"
                onClick={() => {
                  auth.logout();
                  toast.info("Logged out. JWT Session terminated.");
                }}
              >
                <LogOut className="mr-2 size-4" /> Sign Out
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-12">
            {/* Main Auth Form */}
            <div className="md:col-span-7">
              <div className="glass space-y-6 p-6 sm:p-8">
                {/* Mode Selector Tabs */}
                <div className="grid grid-cols-2 rounded-xl bg-accent p-1">
                  <button
                    type="button"
                    onClick={() => setIsRegister(false)}
                    className={`rounded-lg py-2 text-sm font-semibold transition-all ${
                      !isRegister ? "bg-background shadow-xs text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsRegister(true)}
                    className={`rounded-lg py-2 text-sm font-semibold transition-all ${
                      isRegister ? "bg-background shadow-xs text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Register
                  </button>
                </div>

                <form onSubmit={isRegister ? handleRegisterSubmit : handleLoginSubmit} className="space-y-4">
                  {isRegister && (
                    <>
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-muted-foreground">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                          <Input
                            placeholder="e.g. Rahul Verma"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="pl-9"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-muted-foreground">System Role (RBAC)</label>
                        <select
                          value={form.role}
                          onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })}
                          aria-label="System Role (RBAC)"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="Eco Citizen">Eco Citizen / Consumer</option>
                          <option value="Waste Manager">Waste Facility Manager</option>
                          <option value="Recycler">Recycling Specialist</option>
                          <option value="Admin">System Administrator</option>
                        </select>
                      </div>
                    </>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="user@ecowaste.ai"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="pl-9"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-muted-foreground">Password</label>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="pl-9 pr-9"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    {isRegister ? (
                      <>
                        <Sparkles className="mr-2 size-4" /> Register & Generate Token
                      </>
                    ) : (
                      <>
                        <KeyRound className="mr-2 size-4" /> Authenticate with JWT
                      </>
                    )}
                  </Button>
                </form>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsRegister(!isRegister)}
                    className="text-xs text-primary hover:underline"
                  >
                    {isRegister ? "Already registered? Click here to Login" : "Don't have an account? Click here to Register"}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Demo Reviewer Credentials Sidebar */}
            <div className="space-y-4 md:col-span-5">
              <div className="glass space-y-4 p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <UserCheck className="size-4" />
                  <span>Review Viva Demo Accounts</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Click any pre-configured persona to test Section 4.2.5 JWT token generation, role verification, and access control instantly:
                </p>

                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={() => quickDemoLogin("admin@ecowaste.ai", "admin123")}
                    className="w-full rounded-lg border border-border/80 bg-background/50 p-3 text-left transition hover:border-primary/50 hover:bg-accent/50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">👩‍💼 Dr. Ananya Rao</span>
                      <span className="rounded bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary">ADMIN</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">admin@ecowaste.ai (Pass: admin123)</p>
                    <p className="text-[11px] text-muted-foreground/80">Full permissions: Users, dataset, model & logs</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => quickDemoLogin("rahul@ecowaste.ai", "rahul123")}
                    className="w-full rounded-lg border border-border/80 bg-background/50 p-3 text-left transition hover:border-primary/50 hover:bg-accent/50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">🌱 Rahul Verma</span>
                      <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">CITIZEN</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">rahul@ecowaste.ai (Pass: rahul123)</p>
                    <p className="text-[11px] text-muted-foreground/80">Personal waste detection history & eco-points</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => quickDemoLogin("manager@ecowaste.ai", "manager123")}
                    className="w-full rounded-lg border border-border/80 bg-background/50 p-3 text-left transition hover:border-primary/50 hover:bg-accent/50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">🏢 Priya Sharma</span>
                      <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">MANAGER</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">manager@ecowaste.ai (Pass: manager123)</p>
                    <p className="text-[11px] text-muted-foreground/80">Facility level waste categorization audits</p>
                  </button>
                </div>
              </div>

              {/* JWT Security Features Callout */}
              <div className="glass space-y-2 p-5 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground">Section 4.2.5 Architecture Highlights:</p>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 size-3.5 text-primary shrink-0" />
                    <span>Stateless session verification via signed HMAC-SHA256 JWT tokens.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 size-3.5 text-primary shrink-0" />
                    <span>Role-Based Access Control (RBAC) protecting Dashboard and Admin routes.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 size-3.5 text-primary shrink-0" />
                    <span>Automated token expiration and secure client-side persistence.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}
