// src/types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      provider?: string;
      name?: string | null;
      image?: string | null;
      dopInfo?: string | null;
      subscriptions: string[];
      proStatus: boolean;
    } & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    provider?: string;
  }
}
