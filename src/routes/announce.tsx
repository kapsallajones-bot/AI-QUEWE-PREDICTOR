import { createFileRoute } from "@tanstack/react-router";
import { Mic, Volume2, RotateCcw, Play } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/announce")({
  head: () => ({
    meta: [
      { title: "Voice Announcement — Meridian Bank Queue" },
      {
        name: "description",
        content:
          "Voice announcement console broadcasting the currently served queue number and counter assignment.",
      },
      { property: "og:title", content: "Voice Announcement — Meridian Bank Queue" },
      { property: "og:description", content: "Voice announcement console for the branch queue." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AnnouncePage,
});

function AnnouncePage() {
  return (
    <AppShell title="Voice Announcement" subtitle="Announcement engine · English / French">
      <div className="surface-card overflow-hidden">
        <div className="brand-gradient px-10 py-14 text-center text-primary-foreground">
          <p className="text-lg uppercase tracking-[0.45em] text-primary-foreground/75">
            Now serving
          </p>
          <p className="mt-4 text-[9rem] font-bold leading-none">B105</p>
          <p className="mt-4 inline-block rounded-2xl bg-white/15 px-10 py-3 text-4xl font-semibold">
            Counter 3
          </p>

          <div className="mt-10 flex items-center justify-center gap-6">
            <span className="grid size-14 place-items-center rounded-full bg-white/15">
              <Mic className="size-6" />
            </span>
            <div className="flex items-end gap-1.5">
              {[10, 22, 34, 46, 34, 22, 40, 28, 16].map((h, i) => (
                <span
                  key={i}
                  className="w-2 animate-pulse rounded-full bg-primary-foreground/80"
                  style={{ height: h, animationDelay: `${i * 90}ms` }}
                />
              ))}
            </div>
            <span className="grid size-14 place-items-center rounded-full bg-white/15">
              <Volume2 className="size-6" />
            </span>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/75">Voice announcement playing…</p>
        </div>

        <div className="space-y-5 p-8">
          <div className="rounded-xl border border-border bg-muted/50 p-5 text-center">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Announcement text
            </p>
            <p className="mt-2 text-xl font-medium">
              “Queue Number B105, please proceed to Counter 3.”
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Button>
              <Play className="size-4" /> Play announcement
            </Button>
            <Button variant="outline">
              <RotateCcw className="size-4" /> Repeat
            </Button>
            <Button variant="secondary">
              <Volume2 className="size-4" /> Volume 80%
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
