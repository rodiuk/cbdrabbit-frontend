import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface User {
    id: string;
    email: string | null;
    firstName?: string | null;
    lastName?: string | null;
    role: string | null;
  }
  interface Session {
    user: User & {
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      email: string | null;
      role: string | null;
    };
    token: {
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      email: string | null;
      role: string | null;
    };
  }
}
