import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
/*
    Note: No secret provided since it's provided in .env.local
    read more: https://next-auth.js.org/configuration/options#secret

*/
const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    maxAge: 60 * 60, // 1 hour
  },
});
export { handler as GET, handler as POST };
