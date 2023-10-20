import { NextResponse } from "@/node_modules/next/server";
import prisma from "@/lib/prisma/prisma";
import { NextRequestWithAuth } from "next-auth/middleware";
import { getSession } from "next-auth/react";

// export async function GET(req: NextRequestWithAuth) {
//   if (req.method === "GET") {
//     const session = await getSession();
//     // const { email, page, limit } = req.nextUrl.searchParams;
//     const searchParams = req.nextUrl.searchParams;
//     const email = searchParams.get("email");
//     const page = parseInt(searchParams.get("page") || "1", 10);
//     const limit = parseInt(searchParams.get("limit") || "5", 10);
//     console.log("getUser request in api", session);

//     console.log("page:", page);
//     console.log("limit:", limit);

//     if (!email || typeof email !== "string") {
//       try {
//         const offset = (page - 1) * limit;
//         const users = await prisma.users.findMany({
//           skip: offset,
//           take: limit,
//         });
//         const result = NextResponse.json({ users });
//         return result;
//       } catch (error) {
//         return NextResponse.json({ error });
//       }
//     }

//     try {
//       const users = await prisma.users.findUnique({
//         where: {
//           email: email,
//         },
//       });
//       const result = NextResponse.json({ users });
//       return result;
//     } catch (error) {
//       return NextResponse.json({ error });
//     }
//   }
// }

export async function handler(req: NextRequestWithAuth) {
  if (req.method === "GET") {
    const session = await getSession();
    // const { email, page, limit } = req.nextUrl.searchParams;
    const searchParams = req.nextUrl.searchParams;
    const email = searchParams.get("email");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "5", 10);

    if (!email || typeof email !== "string") {
      try {
        const offset = (page - 1) * limit;
        // Pour gerer la pagination
        // const users = await prisma.users.findMany({
        //   skip: offset,
        //   take: limit,
        // });
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
  if (req.method == "POST") {
    // il faut utiliser await pour recuperer le body
    // si non on obtient du undefined
    const body = await req.json();
    try {
      const { username, email, password, phone, firstname, lastname } = body;
      const user = await prisma?.users.create({
        data: {
          username,
          password,
          phone,
          email,
          name: {
            firstname,
            lastname,
          },
        },
      });
      const users = await prisma.users.findMany();
      return NextResponse.json({ users });
    } catch (err: any) {
      console.log(err);
      return NextResponse.json({ error: err.message });
    }
  }

  
}

export { handler as GET, handler as POST, handler as PUT };
