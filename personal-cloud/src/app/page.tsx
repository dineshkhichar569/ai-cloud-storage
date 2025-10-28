import { Button } from "../components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-white">Cloud AI Drive</h1>
      <p className="text-muted-foreground mt-3">
        Production-ready personal cloud storage with AI summaries, tags, and semantic search.
      </p>

      <div className="mt-6 flex items-center gap-3">
        <Button asChild>
          <a href="/health"> Health Check</a>
        </Button>
        <Button variant="outline" asChild>
          <a href="https://nextjs.org" target="_blank" rel="noreferrer">
            {" "}
            Next.js Docs
          </a>
        </Button>
      </div>
    </main>
  );
}
