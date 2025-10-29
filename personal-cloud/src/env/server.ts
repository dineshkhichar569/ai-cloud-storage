//////////////////////    loads + validates server-only env vars  ///////////////////////////

import { serverEnvSchema } from "./schema";

const parsed = serverEnvSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,

  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  EMAIL_SERVER: process.env.EMAIL_SERVER,
  EMAIL_FROM: process.env.EMAIL_FROM,

  MONGODB_URI: process.env.MONGODB_URI,

  S3_ENDPOINT: process.env.S3_ENDPOINT,
  S3_REGION: process.env.S3_REGION,
  S3_BUCKET: process.env.S3_BUCKET,
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,

  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_BASE_URL: process.env.OPENAI_BASE_URL,

  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,

  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX,
});

if (!parsed.success) {
  const issues = parsed.error.issues.map((i) => `- ${i.path.join(".")}: ${i.message}`).join("\n");
  console.error("\n[ENV VALIDATION ERROR]\n" + issues + "\n");
  throw new Error("Invalid environment variables. See log above. ");
}

export const serverEnv = parsed.data;
