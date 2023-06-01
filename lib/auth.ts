import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import bcrypt from "bcrypt";
// const bcrypt = require('bcrypt');
import { User } from "@prisma/client";


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: 'credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const { username, password } = credentials as { username: string, password: string }

        if (!username || !password) {
          return null
        }

        const user = await prisma.user.findFirst({
          where: {
            username: username
          }
        })


        if (!user || !(await bcrypt.compareSync(password, user.password as string))) {
          return null
        }


        return {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role,
        }
        // console.log(a);


        // const check = bcrypt.compareSync(user?.username, password);
        // if (user && credentials?.password == user.password) {
        //   return user
        // } else {
        //   return null;
        // }

        // const user = { id: "1", name: "ali", password: "ali123" };
        // if (username == user.name && password == user.password) {
        //   return user
        // } else {
        //   return null;
        // }


      },
    }),
  ],
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt",
  },
  // jwt: {
  //   secret: process.env.NEXTAUTH_SECRET,
  // },
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    brandColor: "ad", // Hex color code
    logo: "da", // Absolute URL to image
    buttonText: "dsa" // Hex color code
  },

  callbacks: {

    async session({ session, token }) {

      if (token) {
        session.user.id = token.id
        session.user.role = token.role
      }

      return session

    },
    jwt({ token, user }) {
      if (user) {
        const u = user as unknown as any;
        token.role = u.role
        token.id = u.id
      }
      return token
    }


  }
};