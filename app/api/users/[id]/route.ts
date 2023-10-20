import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { ObjectId } from "bson";

// Define a separate function for each HTTP method
// export async function GET(req: NextApiRequest, { params }) {
//   if (req.method == "GET") {
//     try {
//       const user = await prisma?.users.findFirst({
//         where: { id: new ObjectId(params).toString() }, // Convert ObjectId to string
//       });
//       return NextResponse.json({ user });
//     } catch (error) {
//       return NextResponse.json({ error: error });
//     }
//   } else {
//     return NextResponse.json({ message: "hello from permission api" });
//   }
// }
export async function handler(req: NextApiRequest, { params }) {
  if (req.method == "GET") {
    try {
      const user = await prisma?.users.findFirst({
        where: { id: new ObjectId(params).toString() }, // Convert ObjectId to string
      });
      return NextResponse.json({ user });
    } catch (error) {
      return NextResponse.json({ error: error });
    }
  }
  if (req.method == "PUT") {
    // console.log(req);
    try {
      const body = await req.json();
      const { username, email, password, phone, firstname, lastname } = body;
      const user = await prisma?.users.update({
        where: { id: new ObjectId(params).toString() },
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
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: error.message });
    }
  } 
  if(req.method == "DELETE"){
    try{
      const res = await prisma?.users.delete({
        where: {id: new ObjectId(params).toString()}
      })
      return NextResponse.json({message: "users delete successfully!!"});
    }catch(error){
      return NextResponse.json({error: error.message});
    }
  }else {
    return NextResponse.json({ message: "hello from permission api" });
  }
}

// export async function POST(req: NextApiRequest, { params }) {
//   // Remplacez "NextApiRequset" par "NextApiRequest"
//   const { username, email, password, phone } = req.body;
//   try {
//     const user = await prisma?.user.create({
//       // Il faut utiliser "user" au lieu de "users"
//       data: {
//         username,
//         password,
//         phone,
//         email,
//       },
//     });
//     return NextResponse.json({ user });
//   } catch (err: any) {
//     console.log(err);
//     return NextResponse.json({ error: err.message });
//   }
// }

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
