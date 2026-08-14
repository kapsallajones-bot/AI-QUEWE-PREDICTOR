import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Landmark, Mail, ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset password — Meridian Bank Queue Intelligence" },
      {
        name: "description",
        content:
          "Reset your password for the Meridian Bank AI-powered queue management system.",
      },
      { property: "og:title", content: "Reset password — Meridian Bank Queue Intelligence" },
      {
        property: "og:description",
        content: "Reset your password for the AI-powered bank queue management system.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
          {!submitted ? (
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="space-y-2 text-center">
                <h2 className="text-lg font-semibold">Forgot your password?</h2>
                <p className="text-sm text-muted-foreground">
                  Enter your staff email and we&apos;ll send you a reset link.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-9"
                    placeholder="staff@meridianbank.cm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="h-11 w-full text-sm font-semibold">
                Send reset link
              </Button>

              <div className="text-center">
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  <ArrowLeft className="size-4" />
                  Back to sign in
                </Link>
              </div>
            </form>
          ) : (
            <div className="space-y-5 text-center">
              <div className="mx-auto grid size-14 place-items-center rounded-full bg-success/10">
                <CheckCircle2 className="size-7 text-success" />
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Check your email</h2>
                <p className="text-sm text-muted-foreground">
                  If an account exists for <span className="font-medium text-foreground">{email}</span>,
                  you&apos;ll receive a password reset link shortly.
                </p>
              </div>
              <Button asChild variant="outline" className="h-11 w-full text-sm font-semibold">
                <Link to="/">Return to sign in</Link>
              </Button>
            </div>
          )}
        </div>

        <p className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5 text-success" />
          Secured connection · Branch BR-014 Douala Akwa
        </p>
      </div>
    </div>
  );
}
