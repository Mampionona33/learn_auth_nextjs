import Groupe from "@/lib/mongo/groupe";
import { ObjectId } from "bson";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest,{params}) {
  const groupe = new Groupe();
  const id = params.id;
  if (req.method == "GET") {
      const query = {_id:new ObjectId(id)}
      try {
      const groupes = await groupe.fetch(query);
      return NextResponse.json({ groupe });
    } catch (error) {
      return NextResponse.json({ error: error });
    }
  } else {
    return NextResponse.json({ message: "hello from permission api" });
  }
}

