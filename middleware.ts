import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export default withAuth(async function middleware(req: NextRequestWithAuth) {
  const token = req.nextauth.token;
  const pathname = req.nextUrl.pathname;
  const basedUrl = req.nextUrl;
  const prisma = new PrismaClient();

  if (req.nextauth?.token?.email && req.nextUrl.pathname === "/") {
    const dashboardPage = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardPage);
  }
  // try {
  //   const user = await prisma.users.findUnique({
  //     where: { email: token?.email },
  //   });
  //   console.log("user:", user);
  // } catch (error) {
  //   console.log(error);
  // }
});
