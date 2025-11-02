import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    role?: "user" | "admin";
    hasOnboarded?: boolean;
  }
}
