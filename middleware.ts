import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(async function middleware(req: NextRequestWithAuth) {
  const token = req.nextauth.token;
  const pathname = req.nextUrl.pathname;
  const basedUrl = req.nextUrl;

  if (req.nextauth?.token?.email && req.nextUrl.pathname === "/") {
    const dashboardPage = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardPage);
  }
});
