import type { AuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import Provider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { appConfig } from "./app.config";
import { createGoogleUser, getUserByEmail } from "@/libs/api/user.api";
import { User } from "@prisma/client";

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: appConfig.GOOGLE_CLIENT_ID,
      clientSecret: appConfig.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        let user: User | undefined | null = null;
        user = await getUserByEmail(profile.email);

        if (!user) {
          user = await createGoogleUser({
            email: profile.email,
            firstName: profile.given_name,
            lastName: profile.family_name,
          });
        }

        return {
          ...profile,
          id: user.id,
          email: user.email,
          firstName: user?.firstName,
          lastName: user?.lastName,
          role: user?.role,
        };
      },
    }),
    Provider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await getUserByEmail(credentials.email);

        if (!user || !user?.isVerified || !user?.isActive) return null;

        if (user && user?.password) {
          const match = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!match) return null;

          return {
            id: user.id,
            email: user.email,
            firstName: user?.firstName,
            lastName: user?.lastName,
            role: user?.role,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      if (trigger === "update") {
        token.email = session?.user?.email;
      }

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    // strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/signIn",
  },
};
