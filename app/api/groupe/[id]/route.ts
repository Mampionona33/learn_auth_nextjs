import Groupe from "@/lib/mongo/groupe";
import { ObjectId } from "bson";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";

export async function GET(req: NextApiRequest, { params }) {
  // const groupe = new Groupe();
  if (req.method == "GET") {
    try {
      const id = params.id;
      const query = { _id: new ObjectId(id) };
      // const groupes = await groupe.fetch(query);
      const oneGroupe = await prisma.groupe.findFirst(query)
      return NextResponse.json({ oneGroupe });
    } catch (error) {
      return NextResponse.json({ error: error });
    }
  } else {
    return NextResponse.json({ message: "hello from permission api" });
  }
}
