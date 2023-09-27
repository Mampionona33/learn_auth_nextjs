import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const redirectToResponsableHomepage = (request: NextRequestWithAuth) => {
  const token = request.nextauth.token!;
  const pathname = request.nextUrl?.pathname;
  if (
    token.role &&
    token.role.match(/responsable/gi) &&
    !pathname.match(/responsable/gi)
  ) {
    console.log("masostay", pathname);
    return NextResponse.redirect("https://hvqlwx-3000.csb.app/responsable");
  }
  return NextResponse.next();
};

export default redirectToResponsableHomepage;
