import Groupe_permission from "@/lib/mongo/groupe_permission";
import User from "@/lib/mongo/users";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
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
          const userHandler = new User();
          const users = await userHandler.fetchAll();

          if (Array.isArray(users.users)) {
            const user = users.users.find(
              (user) =>
                user.username === credentials?.username &&
                user.password === credentials?.password,
            );
            if (user && user.groupe) {
              return { ...user, groupe: user.groupe || null };
            }
          }
          return null;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/api/auht/signin",
  },
  session: {
    maxAge: 60 * 60, // 1 hour
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user && token) {
        // Check if both user and token are defined
        const userHandler = new User();
        const signedUser = await userHandler.getByEmail(token.email);

        if (Array.isArray(signedUser) && signedUser.length > 0) {
          if (signedUser[0].groupe) {
            token.groupe = signedUser[0].groupe;
          }
          if (signedUser[0]._id) {
            token._id = signedUser[0]._id;
          }
        }
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user = { ...session.user, groupe: token.groupe };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
