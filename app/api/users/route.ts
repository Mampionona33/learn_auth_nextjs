import { NextResponse } from "@/node_modules/next/server";
import prisma from "@/lib/prisma/prisma";
import { NextRequestWithAuth } from "next-auth/middleware";
import { getSession } from "next-auth/react";

// export async function GET() {
//   try {
//     const users= await prisma.users.findMany();
//     const result = NextResponse.json({ users });
//     return result;
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message });
//   }
// }

// export async function GET(req: NextRequestWithAuth) {
//   if (req.method == "GET") {
//     try {
//       const users = await prisma.users.findMany();
//       const result = NextResponse.json({ users });
//       return result;
//     } catch (error) {
//       return NextResponse.json({ error });
//     }
//   }
// }

export async function GET(req: NextRequestWithAuth) {
  if (req.method === "GET") {
    const session = await getSession();
    // const { email, page, limit } = req.nextUrl.searchParams;
    const searchParams = req.nextUrl.searchParams;
    const email = searchParams.get("email");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "5", 10);
    console.log("getUser request in api", session);

    console.log("page:", page);
    console.log("limit:", limit);

    if (!email || typeof email !== "string") {
      try {
        const offset = (page - 1) * limit;
        const users = await prisma.users.findMany({
          skip: offset,
          take: limit,
        });
        const result = NextResponse.json({ users });
        return result;
      } catch (error) {
        return NextResponse.json({ error });
      }
    }

    try {
      const users = await prisma.users.findUnique({
        where: {
          email: email,
        },
      });
      const result = NextResponse.json({ users });
      return result;
    } catch (error) {
      return NextResponse.json({ error });
    }
  }
}
