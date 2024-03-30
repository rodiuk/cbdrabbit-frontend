import type { AuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import Provider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { IUser } from "@/interfaces/user.interface";
import { appConfig } from "./app.config";

const userMock = [
  {
    id: "1",
    email: "pam@i.ua",
    password: "12344321",
    firstName: "Pam",
    lastName: "Pam",
  },
];

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: appConfig.GOOGLE_CLIENT_ID,
      clientSecret: appConfig.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        const user = userMock.find((u) => u.email === profile.email);

        if (!user) return null;

        return {
          ...profile,
          id: user.id,
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

        const user = userMock.find((u) => u.email === credentials.email);

        if (user && user?.password) {
          const match = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!match) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.firstName + " " + user.lastName,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as IUser).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as IUser).id = token.id as string;
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
    // signIn: "/signin",
  },
};
