import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, { params }) {
  if (req.method == "GET") {
    try {
      const user = prisma?.users.findFirst({where:{id:params}})
      return NextResponse.json({ user });
    } catch (error) {
      return NextResponse.json({ error: error });
    }
  } else {
    return NextResponse.json({ message: "hello from permission api" });
  }
}
