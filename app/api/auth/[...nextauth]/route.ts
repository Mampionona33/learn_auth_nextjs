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
          const userApiEndPoint = process.env.USER_API_END_POINT; //|| "https://fakestoreapi.com/users";
          const res = await fetch(userApiEndPoint, {
            method: "GET",
          });

          if (res.ok) {
            const users = await res.json();
            const user = await users.filter(
              (user) =>
                user.username === credentials.username &&
                user.password === credentials.password
            );

            if (user.length > 0) {
              return user[0];
            }
          }
        } catch (error) {
          console.error(error);
        }
        return null;
      },
    }),
  ],
  session: {
    maxAge: 60 * 60, // 1 hour
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
