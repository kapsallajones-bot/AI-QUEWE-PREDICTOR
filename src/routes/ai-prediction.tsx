import { createFileRoute } from "@tanstack/react-router";
import { BrainCircuit, TrendingUp, Timer, Flame, Gauge, Sparkles } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell } from "@/components/AppShell";
import { StatCard } from "@/components/StatCard";
import { forecast, hourlyArrivals } from "@/lib/queue-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ai-prediction")({
  head: () => ({
    meta: [
      { title: "AI Prediction Dashboard — Meridian Bank Queue" },
      {
        name: "description",
        content:
          "Machine-learning forecasts for queue growth, peak hours, cashier efficiency and customer-flow heatmaps.",
      },
      { property: "og:title", content: "AI Prediction Dashboard — Meridian Bank Queue" },
      { property: "og:description", content: "Machine-learning queue forecasting for the branch." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AIPage,
});

const axis = {
  stroke: "var(--color-muted-foreground)",
  fontSize: 12,
  tickLine: false,
  axisLine: false,
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const heat = [
  [2, 4, 6, 8, 7, 5, 6, 8, 4],
  [3, 5, 7, 9, 6, 4, 5, 7, 3],
  [2, 3, 5, 7, 8, 6, 7, 9, 5],
  [4, 6, 8, 9, 7, 5, 6, 6, 4],
  [5, 7, 9, 9, 8, 6, 8, 9, 6],
];

function AIPage() {
  return (
    <AppShell
      title="AI Prediction Dashboard"
      subtitle="Model queue-net v3 · trained 02 Aug 2026 · accuracy 94.1%"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Predicted waiting time" value="18 min" hint="next ticket issued" icon={Timer} />
        <StatCard label="Queue growth forecast" value="+32%" hint="17:00 – 18:00 window" icon={TrendingUp} tone="warning" />
        <StatCard label="Avg. service duration" value="5.1 min" hint="rolling 7-day mean" icon={Gauge} tone="info" />
        <StatCard label="Cashier efficiency" value="88%" hint="vs 82% last week" icon={BrainCircuit} tone="success" />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <div className="surface-card p-5">
          <h2 className="text-sm font-semibold">Queue growth forecast</h2>
          <p className="text-xs text-muted-foreground">Actual vs predicted arrivals</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecast} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="hour" {...axis} />
                <YAxis {...axis} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "0.75rem",
                    fontSize: "12px",
                  }}
                />
                <Line type="monotone" dataKey="actual" stroke="var(--color-chart-1)" strokeWidth={2} />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="var(--color-chart-5)"
                  strokeWidth={2}
                  strokeDasharray="5 4"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface-card p-5">
          <h2 className="text-sm font-semibold">Customer flow heatmap</h2>
          <p className="text-xs text-muted-foreground">Density by weekday and hour</p>
          <div className="mt-6 space-y-2">
            {heat.map((row, i) => (
              <div key={days[i]} className="flex items-center gap-2">
                <span className="w-10 text-xs text-muted-foreground">{days[i]}</span>
                <div className="flex flex-1 gap-1.5">
                  {row.map((v, j) => (
                    <span
                      key={j}
                      className="h-8 flex-1 rounded-md bg-primary"
                      style={{ opacity: 0.12 + v * 0.09 }}
                      title={`${days[i]} ${hourlyArrivals[j]?.hour}: ${v * 8} customers`}
                    />
                  ))}
                </div>
              </div>
            ))}
            <div className="flex gap-2 pl-12 pt-1">
              {hourlyArrivals.map((h) => (
                <span key={h.hour} className="flex-1 text-center text-[10px] text-muted-foreground">
                  {h.hour.slice(0, 2)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="surface-card p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <Flame className="size-4 text-warning" /> Peak hours
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              { range: "11:00 – 12:00", load: 92 },
              { range: "15:00 – 16:00", load: 84 },
              { range: "09:00 – 10:00", load: 61 },
            ].map((p) => (
              <li key={p.range}>
                <div className="flex justify-between">
                  <span>{p.range}</span>
                  <span className="text-muted-foreground">{p.load}% load</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${p.load}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {[
          {
            tone: "border-warning/40 bg-warning/10",
            title: "Open Counter 5 by 16:40",
            body: "Forecast shows a 32% arrival spike; adding one cashier cuts predicted wait from 24 to 11 minutes.",
          },
          {
            tone: "border-primary/30 bg-primary-soft",
            title: "Route loan requests to Counter 4",
            body: "Loan transactions average 11.4 min. Isolating them protects the express deposit lane.",
          },
        ].map((rec) => (
          <div key={rec.title} className={cn("rounded-xl border p-5", rec.tone)}>
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <Sparkles className="size-3.5" /> AI recommendation
            </p>
            <p className="mt-2 text-base font-semibold">{rec.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">{rec.body}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
