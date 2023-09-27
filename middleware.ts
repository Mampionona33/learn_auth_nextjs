import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(async function middleware(req: NextRequestWithAuth) {
  const token = req.nextauth.token!;
  const pathname = req.nextUrl?.pathname;
  const url = req.nextUrl;

  if (token.role && token.role.match(/responsable/gi) && pathname === "/") {
    const respHomePage = new URL("/responsable", req.url);
    console.log("test");
    return NextResponse.redirect(respHomePage);
  }
});
