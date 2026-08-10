import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ListOrdered,
  Users,
  BarChart3,
  Settings,
  BrainCircuit,
  LogOut,
  Landmark,
  Ticket,
  Printer,
  MonitorPlay,
  Volume2,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/queue", label: "Queue Management", icon: ListOrdered },
  { to: "/cashiers", label: "Cashiers", icon: Users },
  { to: "/cashier-desk", label: "Cashier Desk", icon: UserRound },
  { to: "/tickets", label: "Ticket Generation", icon: Ticket },
  { to: "/ticket-print", label: "Printed Ticket", icon: Printer },
  
  { to: "/announce", label: "Announcements", icon: Volume2 },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/ai-prediction", label: "AI Prediction", icon: BrainCircuit },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground lg:flex">
        <div className="flex items-center gap-3 px-5 py-6">
          <div className="grid size-10 place-items-center rounded-xl brand-gradient">
            <Landmark className="size-5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold">Meridian Bank</p>
            <p className="text-xs text-sidebar-foreground/60">Queue Intelligence</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
          {nav.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <LogOut className="size-4" />
            Logout
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 border-b border-border bg-card/80 px-6 py-4 backdrop-blur">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
            {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
          </div>
          <div className="flex items-center gap-2">{actions}</div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
