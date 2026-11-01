import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageShell } from "@/components/eco/Section";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>) => ({ mode: s["mode"] === "register" ? "register" : undefined }) as { mode?: "register" },
  head: () => ({
    meta: [
      { title: "Login / Register — EcoWaste AI" },
      { name: "description", content: "Sign in or create an EcoWaste AI account." },
      { property: "og:title", content: "Login / Register — EcoWaste AI" },
      { property: "og:description", content: "Access your EcoWaste AI detection history." },
    ],
  }),
  component: Login,
});

const schema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function Login() {
  const { mode } = Route.useSearch();
  const [register, setRegister] = useState(mode === "register");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const nav = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) { toast.error(r.error.issues[0]?.message ?? "Invalid input"); return; }
    toast.success(register ? "Account created (demo)" : "Welcome back (demo)");
    nav({ to: "/dashboard" });
  };

  return (
    <PageShell>
      <form onSubmit={submit} className="glass mx-auto max-w-md space-y-4 p-8">
        <h1 className="text-2xl font-bold">{register ? "Create account" : "Welcome back"}</h1>
        <p className="text-sm text-muted-foreground">♻ EcoWaste AI</p>
        {register && <Input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />}
        <Input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <Button type="submit" className="w-full">{register ? "Register" : "Login"}</Button>
        <button type="button" onClick={() => setRegister(!register)} className="w-full text-sm text-primary hover:underline">
          {register ? "Already have an account? Login" : "New here? Register"}
        </button>
      </form>
    </PageShell>
  );
}
