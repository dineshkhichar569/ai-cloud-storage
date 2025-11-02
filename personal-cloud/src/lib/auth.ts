import type { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { mongoClientPromise } from "./mongoose";
import { serverEnv } from "../env/server";
import { getUserByEmail, upsertUserByEmail } from "./user";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(mongoClientPromise),

  providers: [
    Google({
      clientId: serverEnv.GOOGLE_CLIENT_ID,
      clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      server: serverEnv.EMAIL_SERVER,
      from: serverEnv.EMAIL_FROM,
    }),
  ],

  pages: {
    signIn: "/signin",
  },

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },

  ////////To keep user login and cookies safe and secure
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
    csrfToken: {
      name: `__Host-next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
    pkceCodeVerifier: {
      name: `__Host-next-auth.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
    state: {
      name: `__host-next-auth.state`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
    nonce: {
      name: `__Host-next-auth.nonce`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
  },


  callbacks: {
    async signIn({ user }) {
      await upsertUserByEmail({
        email: user.email,
        name: user.name,
        image: user.image,
      });
      return true;
    },
    async jwt({ token }) {
      if (token?.email) {
        const dbUser = await getUserByEmail(token.email);
        if (dbUser) {
          token.role = dbUser.role;
          token.hasOnboarded = dbUser.hasOnboarded;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role) session.role = token.role;
      if (typeof token?.hasOnboarded !== "undefined") {
        session.hasOnboarded = token.hasOnboarded;
      }
      return session;
    },
  },
};
