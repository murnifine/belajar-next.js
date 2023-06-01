import NextAuth from "next-auth/next";
import { User } from "next-auth";
import { UserRole } from "@prisma/client";

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        role: UserRole
    }
}
declare module "next-auth" {
    interface Session {
        user: User & {
            role: UserRole
        };
    }
}