import { NextRequest, NextResponse } from "@/node_modules/next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const authRedirection = async (request: NextRequest) => {
  const appCookie = request.cookies.get("nextjs");
  if (request.nextUrl.pathname === "/api/auth/signin" || appCookie) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/api/auth/signin", request.url));
};

export default authRedirection;
