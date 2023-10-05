import Groupe from "@/lib/mongo/groupe";
import { ObjectId } from "bson";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";

export async function GET(req: NextApiRequest, { params }) {
  // const groupe = new Groupe();
  const id = params.id;
  if (req.method == "GET") {
    try {
      const query = { id: new ObjectId(id) };
      // const groupes = await groupe.fetch(query);
      const groupe = await prisma.groupe.findUnique({ where: query });
      return NextResponse.json({ groupe });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: error });
    }
  } else {
    return NextResponse.json({ message: "hello from permission api" });
  }
}
