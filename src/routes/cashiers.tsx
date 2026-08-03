import { createFileRoute } from "@tanstack/react-router";
import { Plus, Pencil, Trash2, Power, PowerOff, Activity, Star } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { StatusPill } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { cashiers, statusTone } from "@/lib/queue-data";

export const Route = createFileRoute("/cashiers")({
  head: () => ({
    meta: [
      { title: "Cashier Management — Meridian Bank" },
      {
        name: "description",
        content:
          "Administer branch cashiers: counters, availability, customers served, service times and performance ratings.",
      },
      { property: "og:title", content: "Cashier Management — Meridian Bank" },
      { property: "og:description", content: "Administer branch cashiers and counter performance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CashiersPage,
});

function CashiersPage() {
  return (
    <AppShell
      title="Cashier Management"
      subtitle="5 registered cashiers · 4 on duty"
      actions={
        <Button size="sm">
          <Plus className="size-4" /> Add cashier
        </Button>
      }
    >
      <div className="surface-card overflow-x-auto">
        <table className="w-full min-w-[1000px] text-sm">
          <thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3 text-left font-medium">Cashier ID</th>
              <th className="px-5 py-3 text-left font-medium">Name</th>
              <th className="px-5 py-3 text-left font-medium">Counter</th>
              <th className="px-5 py-3 text-left font-medium">Status</th>
              <th className="px-5 py-3 text-left font-medium">Served today</th>
              <th className="px-5 py-3 text-left font-medium">Avg. service</th>
              <th className="px-5 py-3 text-left font-medium">Rating</th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cashiers.map((c) => (
              <tr key={c.id} className="border-t border-border hover:bg-muted/40">
                <td className="px-5 py-3 font-mono text-xs">{c.id}</td>
                <td className="px-5 py-3 font-medium">{c.name}</td>
                <td className="px-5 py-3 text-muted-foreground">Counter {c.counter}</td>
                <td className="px-5 py-3">
                  <StatusPill status={c.status} tone={statusTone[c.status]} />
                </td>
                <td className="px-5 py-3">{c.served}</td>
                <td className="px-5 py-3">{c.avgService.toFixed(1)} min</td>
                <td className="px-5 py-3">
                  <span className="inline-flex items-center gap-1">
                    <Star className="size-3.5 fill-warning text-warning" />
                    {c.rating.toFixed(1)}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-1">
                    <Button size="icon" variant="ghost" aria-label="Edit">
                      <Pencil className="size-4" />
                    </Button>
                    <Button size="icon" variant="ghost" aria-label="View activity">
                      <Activity className="size-4" />
                    </Button>
                    {c.status === "Offline" ? (
                      <Button size="icon" variant="ghost" aria-label="Enable">
                        <Power className="size-4 text-success" />
                      </Button>
                    ) : (
                      <Button size="icon" variant="ghost" aria-label="Disable">
                        <PowerOff className="size-4 text-muted-foreground" />
                      </Button>
                    )}
                    <Button size="icon" variant="ghost" aria-label="Delete">
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
