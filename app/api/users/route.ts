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

export default async function handler(req: NextRequestWithAuth) {
  if (req.method == "GET") {
    try {
      const users = await prisma.users.findMany();
      const result = NextResponse.json({ users });
      return result;
    } catch (error) {
      return NextResponse.json({ error });
    }
  }
}
