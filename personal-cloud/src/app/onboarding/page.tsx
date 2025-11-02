import { Button } from "@/src/components/ui/button";
import { authOptions } from "@/src/lib/auth";
import { getUserByEmail, setOnboardingComplete } from "@/src/lib/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  displayName: z.string().min(2).max(80),
  acceptTos: z
    .preprocess((v) => v === "on" || v === true, z.literal(true))
    .refine((v) => v === true, { message: "You must accept the Terms." }),
});

async function subMitOnboarding(formData: FormData) {
  "use server";
  const displayName = String(formData.get("displayName") || "");
  const acceptTos = formData.get("acceptTos") ? "on" : undefined;

  const parsed = schema.safeParse({ displayName, acceptTos });
  if (!parsed.success) {
    const msg = parsed.error.issues.map((e) => e.message).join(", ");
    throw new Error(msg);
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/signin");
  }

  await setOnboardingComplete(session.user.email!, displayName);
  redirect("/app");
}

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/signin");

  const dbUser = await getUserByEmail(session.user.email!);
  if (dbUser?.hasOnboarded) redirect("/app");

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-6 px-6">
      <div>
        <h1 className="text-2xl font-semibold">Welcome! Let’s get set up.</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Confirm your display name and accept the Terms of Service.
        </p>
      </div>

      <form action={subMitOnboarding} className="grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="displayName">Display name</label>
          <input
            id="displayName"
            name="displayName"
            placeholder={session.user?.name ?? "Your name"}
            defaultValue={session.user?.name ?? ""}
            autoComplete="name"
            required
          />
        </div>

        <label className="flex items-start gap-2 text-sm">
          <input id="acceptTos" name="acceptTos" type="checkbox" className="mt-1" />
          <span>
            I have read and accept the{" "}
            <a className="underline" href="/legal/terms" target="_blank" rel="noreferrer">
              Terms of Service
            </a>
            .
          </span>
        </label>

        <Button type="submit" className="mt-2">
          Finish
        </Button>
      </form>
    </main>
  );
}
