import { createFileRoute } from "@tanstack/react-router";
import { Landmark, Clock } from "lucide-react";

export const Route = createFileRoute("/display")({
  head: () => ({
    meta: [
      { title: "Queue Display Screen — Meridian Bank" },
      {
        name: "description",
        content:
          "Public waiting-area display showing the current queue number, counter, next five tickets and AI estimated waiting time.",
      },
      { property: "og:title", content: "Queue Display Screen — Meridian Bank" },
      { property: "og:description", content: "Public waiting area queue display." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DisplayScreen,
});

const next = ["B106", "B107", "B108", "B109", "B110"];

function DisplayScreen() {
  return (
    <div className="min-h-screen brand-gradient px-10 py-8 text-primary-foreground">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="grid size-14 place-items-center rounded-2xl bg-white/15">
            <Landmark className="size-8" />
          </div>
          <div>
            <p className="text-2xl font-semibold">Meridian Bank</p>
            <p className="text-sm text-primary-foreground/70">Douala Akwa Branch</p>
          </div>
        </div>
        <div className="text-right">
          <p className="flex items-center justify-end gap-2 text-3xl font-semibold tabular-nums">
            <Clock className="size-6" /> 20:43
          </p>
          <p className="text-sm text-primary-foreground/70">Monday, 3 August 2026</p>
        </div>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl bg-white/10 p-12 text-center ring-1 ring-white/20">
          <p className="text-xl uppercase tracking-[0.4em] text-primary-foreground/70">Now serving</p>
          <p className="mt-4 text-[10rem] font-bold leading-none tracking-tight">B105</p>
          <p className="mt-6 inline-block rounded-2xl bg-white/15 px-10 py-4 text-4xl font-semibold">
            Counter 3
          </p>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-white/10 p-8 ring-1 ring-white/20">
            <p className="text-sm uppercase tracking-[0.3em] text-primary-foreground/70">
              Next in line
            </p>
            <ul className="mt-4 space-y-3">
              {next.map((n, i) => (
                <li
                  key={n}
                  className="flex items-center justify-between rounded-xl bg-white/10 px-5 py-3"
                >
                  <span className="text-4xl font-bold tabular-nums">{n}</span>
                  <span className="text-lg text-primary-foreground/70">
                    {i === 0 ? "Called" : `Position ${i + 1}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-white/10 p-8 text-center ring-1 ring-white/20">
            <p className="text-sm uppercase tracking-[0.3em] text-primary-foreground/70">
              AI estimated waiting time
            </p>
            <p className="mt-2 text-6xl font-bold">18 min</p>
            <p className="mt-2 text-primary-foreground/70">for new tickets issued now</p>
          </div>
        </div>
      </div>
    </div>
  );
}
