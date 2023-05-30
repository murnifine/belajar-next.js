import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";


export const authOptions: NextAuthOptions = {

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const user = { id: "1", name: "ali", password: "ali123" };

        if (credentials?.username == user.name && credentials.password == user.password) {
          return user;
        } else {
          return null;

        }
      },

    }),
  ],
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
};