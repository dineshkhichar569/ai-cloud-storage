import { Button } from "@/src/components/ui/button";
import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AppHome() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/signin");
  if (!(session as any).hasOnboarded) redirect("/onboarding");

  if (!session?.user) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-2xl font-semibold">
          Welcome, {session.user?.name ?? session.user?.email}
        </h1>
        <p className="text-muted-foreground mt-2">
          Onboarding complete. You’re inside your workspace.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-semibold">
        Welcome, {session.user?.name ?? session.user?.email}
      </h1>
      <p className="text-muted-foreground mt-2">
        This is your protected workspace. Next we’ll implement Users & Onboarding (Step 4).
      </p>

      <div className="mt-6 flex gap-3">
        <form action="/api/auth/signout" method="post">
          <Button formAction="/api/auth/signout" variant="outline">
            Sign out
          </Button>
        </form>

        <Button asChild>
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
    </main>
  );
}
