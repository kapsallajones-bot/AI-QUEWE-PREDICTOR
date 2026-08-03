import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Printer, Landmark, QrCode } from "lucide-react";
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
import { serviceTypes } from "@/lib/queue-data";

export const Route = createFileRoute("/tickets")({
  head: () => ({
    meta: [
      { title: "Ticket Generation — Meridian Bank Queue" },
      {
        name: "description",
        content:
          "Generate customer queue tickets with AI predicted waiting time, service category and printable receipt preview.",
      },
      { property: "og:title", content: "Ticket Generation — Meridian Bank Queue" },
      { property: "og:description", content: "Generate and print bank queue tickets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TicketsPage,
});

function TicketsPage() {
  const [service, setService] = useState("Deposit");
  const [name, setName] = useState("");

  return (
    <AppShell title="Customer Ticket Generation" subtitle="Reception desk · Terminal T-02">
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="surface-card p-6">
          <h2 className="text-sm font-semibold">Ticket details</h2>

          <div className="mt-5 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="service">Service type</Label>
              <Select value={service} onValueChange={setService}>
                <SelectTrigger id="service">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Customer name (optional)</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Grace Mballa"
              />
            </div>

            <div className="rounded-xl border border-primary/25 bg-primary-soft p-5 text-center">
              <p className="text-xs uppercase tracking-wide text-primary/80">Generated queue number</p>
              <p className="font-mono text-5xl font-bold text-primary">B112</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: "AI predicted waiting time", value: "24 min" },
                { label: "Estimated serving time", value: "5.2 min" },
                { label: "Customers ahead", value: "7" },
                { label: "Assigned service category", value: service },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="mt-1 font-semibold">{item.value}</p>
                </div>
              ))}
            </div>

            <Button className="h-12 w-full text-base font-semibold">
              <Printer className="size-5" /> Print ticket
            </Button>
          </div>
        </div>

        <div className="surface-card flex items-start justify-center bg-muted/40 p-6">
          <TicketPreview service={service} name={name} />
        </div>
      </div>
    </AppShell>
  );
}

function TicketPreview({ service, name }: { service: string; name: string }) {
  return (
    <div className="w-[320px] bg-white p-6 font-mono text-[13px] leading-relaxed text-black shadow-[var(--shadow-float)]">
      <div className="flex flex-col items-center border-b border-dashed border-black/40 pb-4 text-center">
        <Landmark className="size-8" />
        <p className="mt-2 text-base font-bold tracking-widest">MERIDIAN BANK</p>
        <p className="text-[11px]">BR-014 · DOUALA AKWA</p>
      </div>

      <div className="py-4 text-center">
        <p className="text-[11px] uppercase tracking-widest">Queue number</p>
        <p className="text-6xl font-bold leading-none">B112</p>
      </div>

      <div className="space-y-1 border-y border-dashed border-black/40 py-3">
        <Row label="Service" value={service} />
        {name ? <Row label="Customer" value={name} /> : null}
        <Row label="Date" value="03/08/2026" />
        <Row label="Time" value="20:43" />
        <Row label="Est. wait" value="24 min" />
        <Row label="Ahead of you" value="7" />
        <Row label="Counter" value="To be assigned" />
      </div>

      <p className="py-4 text-center text-[11px] uppercase tracking-wide">
        Thank you for banking with us
      </p>

      <div className="flex flex-col items-center gap-1 border-t border-dashed border-black/40 pt-4">
        <QrCode className="size-20" strokeWidth={1.2} />
        <p className="text-[10px]">TRK-B112-20260803</p>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="uppercase">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
