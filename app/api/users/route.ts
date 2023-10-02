import { NextResponse } from "@/node_modules/next/server";
import prisma from "@/lib/prisma/prisma";
import { NextRequestWithAuth } from "next-auth/middleware";

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
    const { email } = req.nextUrl.searchParams
    console.log(email);
    

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid email parameter" });
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
