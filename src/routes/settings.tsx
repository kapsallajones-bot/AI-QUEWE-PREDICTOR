import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cashiers } from "@/lib/queue-data";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "System Settings — Meridian Bank Queue" },
      {
        name: "description",
        content:
          "Configure voice announcements, queue number format, AI prediction, printers, backups, theme and security.",
      },
      { property: "og:title", content: "System Settings — Meridian Bank Queue" },
      { property: "og:description", content: "Configure the bank queue management system." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <AppShell
      title="System Settings"
      subtitle="Branch configuration · last saved 2 hours ago"
      actions={<Button size="sm">Save changes</Button>}
    >
      <Tabs defaultValue="announce">
        <TabsList className="flex-wrap">
          <TabsTrigger value="announce">Announcements</TabsTrigger>
          <TabsTrigger value="queue">Queue &amp; AI</TabsTrigger>
          <TabsTrigger value="hardware">Printer &amp; Backup</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security">Users &amp; Security</TabsTrigger>
        </TabsList>

        <TabsContent value="announce" className="mt-4 space-y-4">
          <Section title="Voice announcement">
            <Row label="Enable voice announcements" hint="Speak queue numbers over the PA system">
              <Switch defaultChecked />
            </Row>
            <Row label="Repeat announcement twice" hint="Improves audibility in busy halls">
              <Switch defaultChecked />
            </Row>
            <Row label="Announcement language">
              <Select defaultValue="en-fr">
                <SelectTrigger className="w-52">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="en-fr">English + French</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            <Row label="Speaker volume" hint="Currently 80%">
              <Slider defaultValue={[80]} max={100} step={5} className="w-52" />
            </Row>
          </Section>
        </TabsContent>

        <TabsContent value="queue" className="mt-4 space-y-4">
          <Section title="Queue number format">
            <Row label="Prefix" hint="Displayed before the sequence number">
              <Input defaultValue="B" className="w-24" />
            </Row>
            <Row label="Digits" >
              <Select defaultValue="3">
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            <Row label="Reset counter daily">
              <Switch defaultChecked />
            </Row>
          </Section>
          <Section title="AI prediction">
            <Row label="Enable AI waiting-time prediction">
              <Switch defaultChecked />
            </Row>
            <Row label="Auto-suggest opening extra counters">
              <Switch defaultChecked />
            </Row>
            <Row label="Model refresh interval">
              <Select defaultValue="15">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">Every 5 minutes</SelectItem>
                  <SelectItem value="15">Every 15 minutes</SelectItem>
                  <SelectItem value="60">Hourly</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            <Row label="Prediction confidence threshold" hint="Currently 0.85">
              <Slider defaultValue={[85]} max={100} step={5} className="w-52" />
            </Row>
          </Section>
        </TabsContent>

        <TabsContent value="hardware" className="mt-4 space-y-4">
          <Section title="Ticket printer">
            <Row label="Printer device">
              <Select defaultValue="tm-t88">
                <SelectTrigger className="w-56">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tm-t88">Epson TM-T88VI (USB)</SelectItem>
                  <SelectItem value="star">Star TSP143 (LAN)</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            <Row label="Paper width">
              <Select defaultValue="80">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="58">58 mm</SelectItem>
                  <SelectItem value="80">80 mm</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            <Row label="Print QR code on ticket">
              <Switch defaultChecked />
            </Row>
          </Section>
          <Section title="Database backup">
            <Row label="Automatic nightly backup" hint="Runs at 23:30 local time">
              <Switch defaultChecked />
            </Row>
            <Row label="Retention" >
              <Select defaultValue="30">
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            <Row label="Manual backup" hint="Last backup 03/08/2026 · 23:30">
              <Button variant="outline" size="sm">
                Back up now
              </Button>
            </Row>
          </Section>
        </TabsContent>

        <TabsContent value="appearance" className="mt-4 space-y-4">
          <Section title="Theme">
            <Row label="Interface theme">
              <Select defaultValue="light">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            <Row label="Compact tables" hint="Fit more rows on screen">
              <Switch />
            </Row>
            <Row label="Display screen brightness boost">
              <Switch defaultChecked />
            </Row>
          </Section>
        </TabsContent>

        <TabsContent value="security" className="mt-4 space-y-4">
          <Section title="User management">
            <div className="divide-y divide-border">
              {cashiers.map((c) => (
                <div key={c.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.id} · Counter {c.counter}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="cashier">
                      <SelectTrigger className="w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="cashier">Cashier</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="sm">
                      Reset password
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Section>
          <Section title="Security">
            <Row label="Two-factor authentication" hint="Required for admin accounts">
              <Switch defaultChecked />
            </Row>
            <Row label="Auto-logout after inactivity">
              <Select defaultValue="15">
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            <Row label="Audit logging" hint="Record all administrative actions">
              <Switch defaultChecked />
            </Row>
          </Section>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="surface-card p-6">
      <h2 className="text-sm font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Row({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border py-3.5 last:border-0">
      <div>
        <Label className="text-sm font-medium">{label}</Label>
        {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      </div>
      {children}
    </div>
  );
}
