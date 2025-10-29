//////////////////////    defines the Zod schema (rules)  ///////////////////////////

import { z } from "zod";

/* Browser can use only NEXT_PUBLIC_ variables */
export const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
});

/* Only for server, not visible to browser */
export const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32, "NEXTAUTH_SECRET should be a long random string"),

  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),

  EMAIL_SERVER: z.string().min(1),
  EMAIL_FROM: z.string().min(1),

  MONGODB_URI: z.string().url(),

  S3_ENDPOINT: z.string().optional().default(""),
  S3_REGION: z.string().min(1),
  S3_BUCKET: z.string().min(1),
  S3_ACCESS_KEY_ID: z.string().min(1),
  S3_SECRET_ACCESS_KEY: z.string().min(1),

  OPENAI_API_KEY: z.string().min(1),
  OPENAI_BASE_URL: z.string().url().optional().or(z.literal("")),

  ALLOWED_ORIGINS: z.string().min(1),
  COOKIE_DOMAIN: z.string().optional().default(""),

  RATE_LIMIT_WINDOW_MS: z.coerce.number().positive().default(60000),
  RATE_LIMIT_MAX: z.coerce.number().positive().default(100),
});
