import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, UserPlus, UserMinus, PhoneCall, Pause, RefreshCw } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { StatusPill } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { queueEntries, statusTone } from "@/lib/queue-data";

export const Route = createFileRoute("/queue")({
  head: () => ({
    meta: [
      { title: "Queue Management — Meridian Bank" },
      {
        name: "description",
        content:
          "Manage the branch queue: call next, pause, add or remove customers and track predicted waiting times.",
      },
      { property: "og:title", content: "Queue Management — Meridian Bank" },
      { property: "og:description", content: "Manage the live branch customer queue." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QueuePage,
});

function QueuePage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const rows = queueEntries.filter(
    (q) =>
      (status === "all" || q.status === status) &&
      (q.number.toLowerCase().includes(search.toLowerCase()) ||
        q.customer.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <AppShell
      title="Queue Management"
      subtitle="17 customers currently in the branch queue"
      actions={
        <>
          <Button size="sm">
            <PhoneCall className="size-4" /> Call next
          </Button>
          <Button size="sm" variant="outline">
            <Pause className="size-4" /> Pause queue
          </Button>
        </>
      }
    >
      <div className="surface-card p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-56 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by queue number or customer"
              className="pl-9"
            />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="Waiting">Waiting</SelectItem>
              <SelectItem value="Called">Called</SelectItem>
              <SelectItem value="Serving">Serving</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <UserPlus className="size-4" /> Add customer
          </Button>
          <Button variant="outline" size="sm">
            <UserMinus className="size-4" /> Remove
          </Button>
          <Button variant="ghost" size="sm">
            <RefreshCw className="size-4" /> Refresh
          </Button>
        </div>
      </div>

      <div className="surface-card mt-4 overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3 text-left font-medium">Queue no.</th>
              <th className="px-5 py-3 text-left font-medium">Customer</th>
              <th className="px-5 py-3 text-left font-medium">Arrival</th>
              <th className="px-5 py-3 text-left font-medium">Predicted wait</th>
              <th className="px-5 py-3 text-left font-medium">Position</th>
              <th className="px-5 py-3 text-left font-medium">Cashier</th>
              <th className="px-5 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((q) => (
              <tr key={q.id} className="border-t border-border hover:bg-muted/40">
                <td className="px-5 py-3 font-mono font-semibold">{q.number}</td>
                <td className="px-5 py-3">{q.customer}</td>
                <td className="px-5 py-3 text-muted-foreground">{q.arrival}</td>
                <td className="px-5 py-3">{q.predictedWait} min</td>
                <td className="px-5 py-3 text-muted-foreground">
                  {q.position === 0 ? "—" : `#${q.position}`}
                </td>
                <td className="px-5 py-3 text-muted-foreground">{q.cashier}</td>
                <td className="px-5 py-3">
                  <StatusPill status={q.status} tone={statusTone[q.status]} />
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-muted-foreground">
                  No customers match your filters.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
