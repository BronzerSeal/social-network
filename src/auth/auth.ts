import bcryptjs from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/schema/zod";
import prisma from "@/utils/prisma";
import getUserFromDb from "@/utils/getUserFromDb";
import Google from "next-auth/providers/google";
import ResendProvider from "next-auth/providers/resend";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    ResendProvider({
      apiKey: process.env.RESEND_API_KEY,
      from: "onboarding@resend.dev",
    }),
    Credentials({
      name: "Account",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email и пароль обязательны");
          }

          const { email, password } =
            await signInSchema.parseAsync(credentials);

          const user = await getUserFromDb(email);

          if (!user || !user.password) {
            throw new Error("Неверный ввод данных");
          }

          const isPasswordValid = await bcryptjs.compare(
            password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Неверный ввод данных");
          }

          return { id: user.id, email: user.email };
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, trigger, session: newSession }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;

        const dbUser = await (prisma.user.findUnique as any)({
          where: { id: user.id },
          select: { provider: true, name: true, image: true },
        });

        token.provider = dbUser?.provider;
        token.name = dbUser?.name;
        token.image = dbUser?.image;
      }

      if (trigger === "update" && newSession?.image) {
        token.image = newSession.image;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.provider = token.provider as string;
        session.user.name = token.name as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          provider: "google",
        },
      });
    },
  },
});
