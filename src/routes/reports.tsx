import { createFileRoute } from "@tanstack/react-router";
import { FileDown, FileSpreadsheet, Printer } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cashiers, hourlyArrivals, serviceTypes } from "@/lib/queue-data";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — Meridian Bank Queue Analytics" },
      {
        name: "description",
        content:
          "Branch reporting: customers served, waiting times, busiest hours, cashier performance and AI prediction accuracy.",
      },
      { property: "og:title", content: "Reports — Meridian Bank Queue Analytics" },
      { property: "og:description", content: "Branch queue reporting and analytics exports." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportsPage,
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

const daily = [
  { day: "Mon", served: 463, wait: 6.2, accuracy: 94 },
  { day: "Tue", served: 398, wait: 5.4, accuracy: 92 },
  { day: "Wed", served: 512, wait: 7.8, accuracy: 90 },
  { day: "Thu", served: 441, wait: 6.6, accuracy: 95 },
  { day: "Fri", served: 587, wait: 9.1, accuracy: 89 },
];

function ReportsPage() {
  return (
    <AppShell
      title="Reports"
      subtitle="Reporting period · 27 July – 3 August 2026"
      actions={
        <>
          <Button size="sm" variant="outline">
            <FileDown className="size-4" /> PDF
          </Button>
          <Button size="sm" variant="outline">
            <FileSpreadsheet className="size-4" /> Excel
          </Button>
          <Button size="sm" variant="ghost">
            <Printer className="size-4" /> Print
          </Button>
        </>
      }
    >
      <div className="surface-card grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-5">
        <div className="space-y-2">
          <Label htmlFor="from">From</Label>
          <Input id="from" type="date" defaultValue="2026-07-27" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="to">To</Label>
          <Input id="to" type="date" defaultValue="2026-08-03" />
        </div>
        <FilterSelect label="Cashier" items={["All cashiers", ...cashiers.map((c) => c.name)]} />
        <FilterSelect label="Service type" items={["All services", ...serviceTypes]} />
        <FilterSelect
          label="Branch"
          items={["BR-014 Douala Akwa", "BR-002 Yaoundé Centre", "BR-021 Bafoussam"]}
        />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <ChartCard title="Daily customers served" subtitle="Completed transactions">
          <BarChart data={daily} margin={{ left: -20, right: 8, top: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="day" {...axis} />
            <YAxis {...axis} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-muted)" }} />
            <Bar dataKey="served" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Average waiting time" subtitle="Minutes per customer">
          <LineChart data={daily} margin={{ left: -20, right: 8, top: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="day" {...axis} />
            <YAxis {...axis} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="wait" stroke="var(--color-chart-4)" strokeWidth={2} />
          </LineChart>
        </ChartCard>

        <ChartCard title="Busiest hours" subtitle="Arrivals by hour of day">
          <BarChart data={hourlyArrivals} margin={{ left: -20, right: 8, top: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="hour" {...axis} />
            <YAxis {...axis} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-muted)" }} />
            <Bar dataKey="customers" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title="AI prediction accuracy" subtitle="Percentage of accurate wait estimates">
          <LineChart data={daily} margin={{ left: -20, right: 8, top: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="day" {...axis} />
            <YAxis domain={[80, 100]} {...axis} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="accuracy" stroke="var(--color-chart-3)" strokeWidth={2} />
          </LineChart>
        </ChartCard>
      </div>

      <div className="surface-card mt-4 overflow-x-auto">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-sm font-semibold">Cashier performance</h2>
        </div>
        <table className="w-full min-w-[700px] text-sm">
          <thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3 text-left font-medium">Cashier</th>
              <th className="px-5 py-3 text-left font-medium">Counter</th>
              <th className="px-5 py-3 text-left font-medium">Served</th>
              <th className="px-5 py-3 text-left font-medium">Avg. service</th>
              <th className="px-5 py-3 text-left font-medium">Rating</th>
            </tr>
          </thead>
          <tbody>
            {cashiers.map((c) => (
              <tr key={c.id} className="border-t border-border">
                <td className="px-5 py-3 font-medium">{c.name}</td>
                <td className="px-5 py-3 text-muted-foreground">Counter {c.counter}</td>
                <td className="px-5 py-3">{c.served}</td>
                <td className="px-5 py-3">{c.avgService.toFixed(1)} min</td>
                <td className="px-5 py-3">{c.rating.toFixed(1)} / 5</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}

function FilterSelect({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select defaultValue={items[0]}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((i) => (
            <SelectItem key={i} value={i}>
              {i}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactElement;
}) {
  return (
    <div className="surface-card p-5">
      <h2 className="text-sm font-semibold">{title}</h2>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
      <div className="mt-4 h-60">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
