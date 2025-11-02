"use client";

import { Button } from "@/src/components/ui/button";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [email, setEmail] = useState("");

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-6 px-6 text-white">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Sign in to Cloud AI Drive</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Use Google or receive a magic link via email.
        </p>
      </div>

      <div className="space-y-3">
        <Button
          className="w-full cursor-pointer"
          onClick={() => signIn("google", { callbackUrl: "/app" })}
          aria-label="Sign in with Google"
        >
          Continue with Google
        </Button>

        <div className="text-muted-foreground relative my-3 text-center text-xs">
          <span className="bg-background px-2">or</span>
          <div className="bg-border absolute top-1/2 left-0 h-px w-full -translate-y-1/2" />
        </div>

        <div className="grid gap-2">
          <label htmlFor="email">Email address</label>
          <input
            id="gmail"
            type="gmail"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />

          <Button
            className="mt-2 cursor-pointer"
            onClick={() => signIn("email", { email, callbackUrl: "/app" })}
            disabled={!email}
          >
            Send magic link
          </Button>
        </div>
      </div>
    </main>
  );
}
