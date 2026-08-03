import { createFileRoute } from "@tanstack/react-router";
import { Landmark, QrCode, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/ticket-print")({
  head: () => ({
    meta: [
      { title: "Printed Queue Ticket — Meridian Bank" },
      {
        name: "description",
        content:
          "Thermal receipt preview of a bank queue ticket with queue number, service type, AI estimated wait and QR code.",
      },
      { property: "og:title", content: "Printed Queue Ticket — Meridian Bank" },
      { property: "og:description", content: "Thermal receipt preview of a bank queue ticket." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TicketPrintPage,
});

function TicketPrintPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-muted/60 px-4 py-12">
      <div className="w-[340px] bg-white px-7 py-8 font-mono text-[13px] leading-relaxed text-black shadow-[var(--shadow-float)]">
        <div className="flex flex-col items-center border-b border-dashed border-black/40 pb-4 text-center">
          <Landmark className="size-9" />
          <p className="mt-2 text-lg font-bold tracking-[0.2em]">MERIDIAN BANK</p>
          <p className="text-[11px]">BR-014 · DOUALA AKWA</p>
        </div>

        <div className="py-5 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em]">Your queue number</p>
          <p className="text-7xl font-bold leading-none">B112</p>
        </div>

        <div className="space-y-1 border-y border-dashed border-black/40 py-4">
          <Row label="Service" value="Deposit" />
          <Row label="Date" value="03/08/2026" />
          <Row label="Time" value="20:43" />
          <Row label="AI est. wait" value="24 min" />
          <Row label="Ahead of you" value="7 customers" />
          <Row label="Counter" value="Counter 2" />
        </div>

        <p className="py-5 text-center text-[11px] uppercase tracking-wide">
          Please keep this ticket
          <br />
          Thank you for banking with us
        </p>

        <div className="flex flex-col items-center gap-1 border-t border-dashed border-black/40 pt-5">
          <QrCode className="size-24" strokeWidth={1.1} />
          <p className="text-[10px] tracking-wide">TRK-B112-20260803-2043</p>
        </div>
      </div>

      <Button variant="outline" onClick={() => window.print()}>
        <Printer className="size-4" /> Print this ticket
      </Button>
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
