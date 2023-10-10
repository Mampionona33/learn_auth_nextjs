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
    const session = await getSession()
    const { email } = req.nextUrl.searchParams;
    console.log("getUser request in api", session);

    if (!email || typeof email !== "string") {
      try {
        const users = await prisma.users.findMany();
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
