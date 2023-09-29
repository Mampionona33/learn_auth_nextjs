import Groupe from "@/lib/mongo/groupe";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, { params }) {
  const groupe = new Groupe();
  const id = params.id;
  console.log(id);
  const query = { _id: ObjectId(id) };
  if (req.method == "GET") {
    try {
      const groupes = await groupe.fetch();
      return NextResponse.json({ groupes });
    } catch (error) {
      return NextResponse.json({ error: error });
    }
  } else {
    return NextResponse.json({ message: "hello from permission api" });
  }
}
