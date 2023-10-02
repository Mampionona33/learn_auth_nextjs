import Groupe_permission from "@/lib/mongo/groupe_permission";
import User from "@/lib/mongo/users";
import { PrismaClient } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma/prisma";

/*
    Note: No secret provided since it's provided in .env.local
    read more: https://next-auth.js.org/configuration/options#secret

*/

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        try {
          // const userHandler = new User();
          // const users = await userHandler.fetchAll();
          const users = await prisma.users.findMany();
          // console.log("userList in /auth/nextauth/route.ts:", users);

          const user = await prisma.users.findFirst({
            where: {
              username: credentials?.username,
              password: credentials?.password,
            },
          });

          if (user !== null) {
            console.log(user.id);
            return user;
            // Include all user data in the token
            // return Promise.resolve(user);
          }
          return null;
          // return Promise.resolve(null);
        } catch (error) {
          console.error(error);
          return Promise.resolve(null);
        }
      },
    }),
  ],

  pages: {
    signIn: "/api/auth/signin",
  },

  session: {
    maxAge: 60 * 60, // 1 hour
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
