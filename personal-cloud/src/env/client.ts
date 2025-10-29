//////////////////////    loads + validates client-safe vars  ///////////////////////////

import { clientEnvSchema } from "./schema";

const parsed = clientEnvSchema.safeParse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});

if (!parsed.success) {
  const issues = parsed.error.issues.map((i) => `- ${i.path.join(".")}: ${i.message}`).join("\n");

  console.error("\n[CLIENT ENV VALIDATION ERROR]\n" + issues + "\n");
  throw new Error("Invalid public environment variables.");
}

export const clientEnv = parsed.data;