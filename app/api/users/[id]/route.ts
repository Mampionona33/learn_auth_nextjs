import User from "@/lib/mongo/users";
import { ObjectId } from "bson";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, { params }) {
  const userHandler = new User();
  const id = params.id;
  const query = { _id: new ObjectId(id) };
  if (req.method == "GET") {
    try {
      const user = await userHandler.fetch(query);
      return NextResponse.json({ user });
    } catch (error) {
      return NextResponse.json({ error: error });
    }
  } else {
    return NextResponse.json({ message: "hello from permission api" });
  }
}
