import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import redirectToResponsableHomepage from "./lib/middleware/redirectToResponsableHomepage";
import { NextResponse } from "next/server";

export default withAuth(async function middleware(req: NextRequestWithAuth) {
  console.log("Middleware.ts is running");

  await redirectToResponsableHomepage(req);
  console.log("dsfsqfq");
  return NextResponse.next();
});
