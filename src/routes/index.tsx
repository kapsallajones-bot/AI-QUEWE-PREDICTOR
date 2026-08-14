import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Landmark, Lock, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign in — Meridian Bank Queue Intelligence" },
      {
        name: "description",
        content:
          "Secure staff login for the Meridian Bank AI-powered queue management system. Admin and cashier access.",
      },
      { property: "og:title", content: "Sign in — Meridian Bank Queue Intelligence" },
      {
        property: "og:description",
        content: "Secure staff login for the AI-powered bank queue management system.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [role, setRole] = useState("admin");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="absolute inset-0 -z-10 bg-[var(--gradient-surface)]" />
      <div className="absolute -left-40 -top-40 -z-10 size-[36rem] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-52 -right-32 -z-10 size-[34rem] rounded-full bg-info/10 blur-3xl" />

      <div className="w-full max-w-[420px]">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="grid size-16 place-items-center rounded-2xl brand-gradient shadow-[var(--shadow-float)]">
            <Landmark className="size-8 text-primary-foreground" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">Meridian Bank</h1>
          <p className="text-sm text-muted-foreground">Queue Intelligence Terminal v4.2</p>
        </div>

        <div className="surface-card p-7">
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="username" className="pl-9" placeholder="staff.id" defaultValue="a.tchoumi" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type="password" className="pl-9" placeholder="••••••••" defaultValue="password" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Sign in as</Label>
              <RadioGroup value={role} onValueChange={setRole} className="grid grid-cols-2 gap-3">
                {[
                  { value: "admin", label: "Admin", hint: "Full control" },
                  { value: "cashier", label: "Cashier", hint: "Counter desk" },
                ].map((opt) => (
                  <Label
                    key={opt.value}
                    htmlFor={opt.value}
                    data-active={role === opt.value}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 transition-colors data-[active=true]:border-primary data-[active=true]:bg-primary-soft"
                  >
                    <RadioGroupItem id={opt.value} value={opt.value} className="mt-0.5" />
                    <span className="leading-tight">
                      <span className="block text-sm font-medium">{opt.label}</span>
                      <span className="block text-xs text-muted-foreground">{opt.hint}</span>
                    </span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="remember" className="flex items-center gap-2 text-sm font-normal">
                <Checkbox id="remember" defaultChecked />
                Remember me
              </Label>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button asChild className="h-11 w-full text-sm font-semibold">
              <Link to={role === "admin" ? "/dashboard" : "/cashier-desk"}>Login</Link>
            </Button>
          </form>
        </div>

        <p className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5 text-success" />
          Secured connection · Branch BR-014 Douala Akwa
        </p>
      </div>
    </div>
  );
}
