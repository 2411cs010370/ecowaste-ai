import type { ReactNode } from "react";

export function SectionTitle({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {desc && <p className="mt-3 text-muted-foreground">{desc}</p>}
    </div>
  );
}

export function StatCard({ icon, label, value, sub }: { icon: ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="glass lift animate-rise p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <span className="rounded-xl bg-accent p-2 text-primary">{icon}</span>
      </div>
      <p className="mt-3 text-3xl font-bold">{value}</p>
      {sub && <p className="mt-1 text-xs text-primary">{sub}</p>}
    </div>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <main className="mx-auto w-full max-w-7xl px-5 py-12">{children}</main>;
}
