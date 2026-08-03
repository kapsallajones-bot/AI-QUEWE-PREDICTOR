import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play, CheckCircle2, SkipForward, PhoneCall, Timer, UserRound } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { queueEntries } from "@/lib/queue-data";

export const Route = createFileRoute("/cashier-desk")({
  head: () => ({
    meta: [
      { title: "Cashier Desk — Meridian Bank Queue" },
      {
        name: "description",
        content:
          "Cashier workstation: availability toggle, current customer transaction timer and AI-predicted upcoming queue.",
      },
      { property: "og:title", content: "Cashier Desk — Meridian Bank Queue" },
      { property: "og:description", content: "Cashier workstation for serving the branch queue." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CashierDesk,
});

function CashierDesk() {
  const [available, setAvailable] = useState(true);
  const upcoming = queueEntries.filter((q) => q.status === "Waiting").slice(0, 5);

  return (
    <AppShell title="Cashier Dashboard" subtitle="Counter 3 · Shift 08:00 – 16:00">
      <div className="surface-card flex flex-wrap items-center justify-between gap-6 p-5">
        <div className="flex items-center gap-4">
          <div className="grid size-14 place-items-center rounded-2xl bg-primary-soft text-primary">
            <UserRound className="size-7" />
          </div>
          <div>
            <p className="text-lg font-semibold">Chantal Ndifor</p>
            <p className="text-sm text-muted-foreground">CSH-003 · Counter 3 · Teller</p>
          </div>
        </div>

        <div
          className={cn(
            "flex items-center gap-4 rounded-xl border px-5 py-3",
            available
              ? "border-success/30 bg-success/10"
              : "border-destructive/30 bg-destructive/10",
          )}
        >
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Current status</p>
            <p
              className={cn(
                "text-2xl font-semibold",
                available ? "text-success" : "text-destructive",
              )}
            >
              {available ? "Available" : "Busy"}
            </p>
          </div>
          <Switch checked={available} onCheckedChange={setAvailable} className="scale-125" />
        </div>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <div className="surface-card p-6 xl:col-span-2">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Now serving</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-6xl font-bold tracking-tight text-primary">B105</p>
              <p className="mt-1 text-sm text-muted-foreground">Amina Njoya · Withdrawal</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-muted-foreground">Estimated service</p>
                <p className="text-2xl font-semibold">4m 30s</p>
              </div>
              <div>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Timer className="size-3.5" /> Transaction timer
                </p>
                <p className="font-mono text-2xl font-semibold text-success">02:47</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button>
              <Play className="size-4" /> Start service
            </Button>
            <Button variant="outline">
              <CheckCircle2 className="size-4" /> Complete service
            </Button>
            <Button variant="outline">
              <SkipForward className="size-4" /> Skip customer
            </Button>
            <Button variant="secondary">
              <PhoneCall className="size-4" /> Call next customer
            </Button>
          </div>
        </div>

        <div className="surface-card p-5">
          <h2 className="text-sm font-semibold">Upcoming customers</h2>
          <p className="text-xs text-muted-foreground">AI-predicted waiting times</p>
          <ul className="mt-4 space-y-2">
            {upcoming.map((q) => (
              <li
                key={q.id}
                className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5"
              >
                <div>
                  <p className="font-mono text-sm font-semibold">{q.number}</p>
                  <p className="text-xs text-muted-foreground">{q.service}</p>
                </div>
                <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary">
                  ~{q.predictedWait} min
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
