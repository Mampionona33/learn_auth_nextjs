import { NextResponse } from "@/node_modules/next/server";

const redirectToResponsableHomepage = (request) => {
  const token = request.nextauth?.token;
  const pathname = request.nextUrl?.pathname;
  return NextResponse.redirect(new URL("/responsable", request.url));
  console.log(token);
  console.log(pathname);
  console.log("test");

  if (token && pathname) {
    // if (token.role) {
    //   return NextResponse.redirect(new URL("/responsable", request.url));
    // }
  }

  return NextResponse.next();
};

export default redirectToResponsableHomepage;
