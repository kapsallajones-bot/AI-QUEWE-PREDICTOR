import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Landmark, Clock, Ticket, CheckCircle2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { serviceTypes, queueEntries } from "@/lib/queue-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Queue Ticket — Meridian Bank" },
      {
        name: "description",
        content:
          "Book your bank queue ticket in real time, see the number now serving, the next customers in line and your AI estimated waiting time.",
      },
      { property: "og:title", content: "Book a Queue Ticket — Meridian Bank" },
      {
        property: "og:description",
        content: "Self-service ticket booking with a live queue display for Meridian Bank customers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CustomerBooking,
});

const nowServing = { number: "B105", counter: "Counter 3" };

function CustomerBooking() {
  const [name, setName] = useState("");
  const [service, setService] = useState(serviceTypes[0]);
  const [ticket, setTicket] = useState<{ number: string; wait: number; position: number } | null>(
    null,
  );
  const [clock, setClock] = useState("--:--");

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
      );
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);

  const waiting = useMemo(() => queueEntries.filter((q) => q.status === "Waiting"), []);
  const upcoming = useMemo(
    () => queueEntries.filter((q) => q.status !== "Completed").slice(0, 5),
    [],
  );

  const book = () => {
    const last = 111 + (ticket ? 1 : 0);
    const position = waiting.length + 1 + (ticket ? 1 : 0);
    setTicket({
      number: `B${last + 1}`,
      wait: position * 4,
      position,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="brand-gradient px-6 py-5 text-primary-foreground sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-2xl bg-white/15">
              <Landmark className="size-6" />
            </div>
            <div className="leading-tight">
              <p className="text-lg font-semibold">Meridian Bank</p>
              <p className="text-sm text-primary-foreground/70">Douala Akwa Branch</p>
            </div>
          </div>
          <p className="flex items-center gap-2 text-2xl font-semibold tabular-nums">
            <Clock className="size-5" /> {clock}
          </p>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 p-6 sm:p-10 lg:grid-cols-[1fr_1fr]">
        <section className="surface-card rounded-2xl border border-border p-6">
          <h1 className="text-xl font-semibold tracking-tight">Book your ticket</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose your service and get a queue number instantly.
          </p>

          <div className="mt-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="cust-name">Full name</Label>
              <Input
                id="cust-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Amina Njoya"
              />
            </div>

            <div className="space-y-2">
              <Label>Service required</Label>
              <div className="grid gap-2 sm:grid-cols-2">
                {serviceTypes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setService(s)}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                      service === s
                        ? "border-primary bg-primary/10 font-medium text-primary"
                        : "border-border hover:bg-muted",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <Button className="w-full" size="lg" disabled={!name.trim()} onClick={book}>
              <Ticket className="size-4" />
              Get my ticket
            </Button>

            {ticket ? (
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 text-center">
                <p className="flex items-center justify-center gap-2 text-sm text-primary">
                  <CheckCircle2 className="size-4" /> Ticket confirmed
                </p>
                <p className="mt-2 text-6xl font-bold tracking-tight tabular-nums">
                  {ticket.number}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {service} · {name}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-card p-3">
                    <p className="text-muted-foreground">Position</p>
                    <p className="text-lg font-semibold">{ticket.position}</p>
                  </div>
                  <div className="rounded-xl bg-card p-3">
                    <p className="text-muted-foreground">Est. wait</p>
                    <p className="text-lg font-semibold">{ticket.wait} min</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-2xl brand-gradient p-8 text-center text-primary-foreground">
            <p className="text-sm uppercase tracking-[0.3em] text-primary-foreground/70">
              Now serving
            </p>
            <p className="mt-2 text-7xl font-bold leading-none tabular-nums">
              {nowServing.number}
            </p>
            <p className="mt-4 inline-block rounded-xl bg-white/15 px-6 py-2 text-xl font-semibold">
              {nowServing.counter}
            </p>
          </div>

          <div className="surface-card rounded-2xl border border-border p-6">
            <p className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Users className="size-4" /> Next in line
            </p>
            <ul className="mt-4 space-y-2">
              {upcoming.map((q, i) => (
                <li
                  key={q.id}
                  className="flex items-center justify-between rounded-xl bg-muted/60 px-4 py-3"
                >
                  <span className="text-2xl font-bold tabular-nums">{q.number}</span>
                  <span className="text-sm text-muted-foreground">
                    {i === 0 ? q.status : `Position ${i}`} · {q.service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="surface-card rounded-2xl border border-border p-6 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
              AI estimated waiting time
            </p>
            <p className="mt-2 text-5xl font-bold">{(waiting.length + 1) * 4} min</p>
            <p className="mt-1 text-sm text-muted-foreground">for tickets issued now</p>
          </div>
        </section>
      </main>
    </div>
  );
}
