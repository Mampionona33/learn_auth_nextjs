import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(async function middleware(req: NextRequestWithAuth) {
  const token = req.nextauth.token!;
  const pathname = req.nextUrl?.pathname;
  const url = req.nextUrl;

  if (token) {
    // console.log(token);
  }

  // if (token.role) {
  //   console.log("token.role", token.role);
  //   // if (token.role.match(/responsable/gi)) {
  //   //   if (pathname === "/") {
  //   //     const respHomePage = new URL("/responsable", req.url);
  //   //     return NextResponse.redirect(respHomePage);
  //   //   }
  //   // }
  // } else {
  //   if (pathname === "/responsable") {
  //     const homePage = new URL("/", req.url);
  //     return NextResponse.redirect(homePage);
  //   }
  // }
});
