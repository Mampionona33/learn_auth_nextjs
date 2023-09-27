import { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const redirectToResponsableHomepage = (request: NextRequestWithAuth) => {
  console.log("test"); // Add more logic here
  return NextResponse.next();
};

export default redirectToResponsableHomepage;
