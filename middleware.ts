import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(async function middleware(req: NextRequestWithAuth) {
  const token = req.nextauth.token!;
  const pathname = req.nextUrl?.pathname;
  const url = req.nextUrl;

  if (token) {
    try {
      // Vous devrez ajuster l'URL de votre API utilisateur en fonction de votre configuration
      const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/users/${token._id}`,
      );

      if (!response.ok) {
        console.error(
          `Fetching user role failed with status ${response.status}`,
        );
        return NextResponse.error();
      }

      const user = await response.json();
      console.log(user);
    } catch (error) {
      console.error("Error while fetching user role:", error);
      return NextResponse.error();
    }
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
