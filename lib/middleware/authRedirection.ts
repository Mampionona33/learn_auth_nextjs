import { NextRequest, NextResponse } from "@/node_modules/next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const authRedirection = async (request: NextRequest) => {
  const appCookie = request.cookies.get("nextjs");

  //   console.log("Request URL:", request.nextUrl);
  //   console.log("Cookie:", appCookie);

  if (request.nextUrl.pathname === "/api/auth/signin" || appCookie) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/api/auth/signin", request.url));
};

export default authRedirection;
