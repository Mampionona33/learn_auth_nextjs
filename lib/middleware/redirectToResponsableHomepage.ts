import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const redirectToResponsableHomepage = async (request: NextRequestWithAuth) => {
  const respHomePage = new URL("/responsable", request.url);
  return NextResponse.redirect(respHomePage);
  // const token = request.nextauth.token!;
  // const pathname = request.nextUrl?.pathname;
  // const url = request.nextUrl;

  // if (
  //   token.role &&
  //   token.role.match(/responsable/gi) &&
  //   pathname !== "/responsable"
  // ) {
  //   const respHomePage = new URL("/responsable", request.url);
  //   console.log("test");
  //   return NextResponse.rewrite(respHomePage);
  // }
};

export default redirectToResponsableHomepage;
