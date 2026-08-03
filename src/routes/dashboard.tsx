import { createFileRoute } from "@tanstack/react-router";
import {
  Users,
  Hourglass,
  UserCheck,
  Timer,
  Gauge,
  RefreshCw,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell } from "@/components/AppShell";
import { StatCard, StatusPill } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { hourlyArrivals, queueEntries, statusTone } from "@/lib/queue-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Meridian Queue Intelligence" },
      {
        name: "description",
        content:
          "Live branch overview: customers waiting, active cashiers, average waiting time and AI queue efficiency.",
      },
      { property: "og:title", content: "Admin Dashboard — Meridian Queue Intelligence" },
      {
        property: "og:description",
        content: "Live branch queue overview with AI predicted waiting times.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

const axis = {
  stroke: "var(--color-muted-foreground)",
  fontSize: 12,
  tickLine: false,
  axisLine: false,
};

const tooltipStyle = {
  background: "var(--color-card)",
  border: "1px solid var(--color-border)",
  borderRadius: "0.75rem",
  fontSize: "12px",
};

function DashboardPage() {
  return (
    <AppShell
      title="Admin Dashboard"
      subtitle="Branch BR-014 · Douala Akwa · Monday, 3 August"
      actions={
        <Button variant="outline" size="sm">
          <RefreshCw className="size-4" /> Refresh
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total customers today" value="463" hint="+8.4% vs last Monday" icon={Users} />
        <StatCard label="Customers waiting" value="17" hint="5 in priority lane" icon={Hourglass} tone="warning" />
        <StatCard label="Active cashiers" value="4 / 5" hint="Counter 5 offline" icon={UserCheck} tone="success" />
        <StatCard label="Avg. waiting time" value="6m 12s" hint="Target under 8m" icon={Timer} tone="info" />
        <StatCard label="Queue efficiency" value="92%" hint="AI model confidence 0.94" icon={Gauge} tone="success" />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <div className="surface-card p-5">
          <h2 className="text-sm font-semibold">Hourly customer arrivals</h2>
          <p className="text-xs text-muted-foreground">Footfall recorded per hour</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyArrivals} margin={{ left: -20, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="arrivals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="hour" {...axis} />
                <YAxis {...axis} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="customers"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2}
                  fill="url(#arrivals)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface-card p-5">
          <h2 className="text-sm font-semibold">Average service time</h2>
          <p className="text-xs text-muted-foreground">Minutes per customer</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyArrivals} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="hour" {...axis} />
                <YAxis {...axis} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-muted)" }} />
                <Bar dataKey="service" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="surface-card mt-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold">Live queue</h2>
            <p className="text-xs text-muted-foreground">Updated 4 seconds ago</p>
          </div>
          <span className="flex items-center gap-2 text-xs text-success">
            <span className="size-2 animate-pulse rounded-full bg-success" /> Live
          </span>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3 text-left font-medium">Queue no.</th>
              <th className="px-5 py-3 text-left font-medium">Status</th>
              <th className="px-5 py-3 text-left font-medium">Assigned cashier</th>
              <th className="px-5 py-3 text-left font-medium">Predicted wait</th>
              <th className="px-5 py-3 text-left font-medium">Position</th>
            </tr>
          </thead>
          <tbody>
            {queueEntries
              .filter((q) => q.status !== "Completed")
              .map((q) => (
                <tr key={q.id} className="border-t border-border">
                  <td className="px-5 py-3 font-mono font-semibold">{q.number}</td>
                  <td className="px-5 py-3">
                    <StatusPill status={q.status} tone={statusTone[q.status]} />
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{q.cashier}</td>
                  <td className="px-5 py-3">{q.predictedWait} min</td>
                  <td className="px-5 py-3 text-muted-foreground">
                    {q.position === 0 ? "At counter" : `#${q.position}`}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
