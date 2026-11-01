import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X, LogOut, ShieldCheck, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/detect", label: "Detect Waste" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/analytics", label: "Analytics" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    setDark(localStorage.getItem("eco-theme") === "dark");
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("eco-theme", dark ? "dark" : "light");
  }, [dark]);

  const handleLogout = () => {
    auth.logout();
    toast.info("Logged out successfully. JWT session ended.");
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 px-4 pt-3">
      <nav className="glass mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <Link to="/" className="text-lg font-bold">
          ♻ <span className="eco-gradient-text">EcoWaste AI</span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              activeProps={{ className: "bg-accent text-accent-foreground font-medium" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
          {auth.isAdmin && (
            <Link
              to="/admin"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-accent hover:text-accent-foreground"
              activeProps={{ className: "bg-primary/10 text-primary font-bold" }}
            >
              Admin
            </Link>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Toggle dark mode" onClick={() => setDark((d) => !d)}>
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>

          {auth.isAuthenticated && auth.user ? (
            <div className="hidden items-center gap-2 sm:flex">
              {/* Logged in User Pill with Eco Points & Role */}
              <Link
                to="/dashboard"
                className="flex items-center gap-2 rounded-full border border-border bg-accent/40 px-3 py-1 text-xs transition hover:bg-accent"
              >
                <span className="flex size-6 items-center justify-center rounded-full bg-primary/20 text-xs">
                  {auth.user.avatar || "👤"}
                </span>
                <span className="max-w-[100px] truncate font-medium text-foreground">{auth.user.name.split(" ")[0]}</span>
                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                  {auth.user.role === "Admin" ? "Admin" : `🌿 ${auth.user.ecoPoints}`}
                </span>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} title="Sign Out">
                <LogOut className="size-4" />
              </Button>
            </div>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="hidden sm:inline-flex">
                <Link to="/login" search={{ mode: "register" }}>Register</Link>
              </Button>
            </>
          )}

          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>
      {open && (
        <div className="glass mx-auto mt-2 flex max-w-7xl flex-col p-4 lg:hidden space-y-2">
          {auth.isAuthenticated && auth.user && (
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{auth.user.avatar || "👤"}</span>
                <div>
                  <p className="text-sm font-semibold">{auth.user.name}</p>
                  <p className="text-xs text-muted-foreground">{auth.user.role} • 🌿 {auth.user.ecoPoints} pts</p>
                </div>
              </div>
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                JWT Active
              </span>
            </div>
          )}

          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm hover:bg-accent">
              {n.label}
            </Link>
          ))}

          {auth.isAdmin && (
            <Link to="/admin" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-semibold text-primary hover:bg-accent">
              Admin Panel
            </Link>
          )}

          {auth.isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-500 hover:bg-destructive/10"
            >
              <LogOut className="size-4" /> Sign Out
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
              <Button asChild variant="outline" size="sm" onClick={() => setOpen(false)}>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild size="sm" onClick={() => setOpen(false)}>
                <Link to="/login" search={{ mode: "register" }}>Register</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
