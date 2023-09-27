import authRedirection from "./lib/middleware/authRedirection";
import { NextRequest, NextResponse } from "@/node_modules/next/server";

export async function middleware(request: NextRequest) {
  try {
    await authRedirection(request);
    return NextResponse.next();
  } catch (error: any) {
    // Handle errors, for example, log them or return an error response
    console.error("Error in middleware:", error);
    return new NextResponse.error(error.message);
  }
}

export const config = {
  matcher: ["/:path*"],
};
