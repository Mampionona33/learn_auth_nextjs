import Groupe from "@/lib/mongo/groupe";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";

export async function GET(req: NextApiRequest) {
  if (req.method == "GET") {
    try {
      const groupes = await prisma.groupe.findMany();
      // const groupes = await groupe.fetch();
      return NextResponse.json({ groupes });
    } catch (error) {
      return NextResponse.json({ error: error });
    }
  } else {
    return NextResponse.json({ message: "hello from permission api" });
  }
}
