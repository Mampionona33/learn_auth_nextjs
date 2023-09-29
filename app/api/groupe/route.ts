import Groupe from "@/lib/mongo/groupe";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

async function handler(req: NextApiRequest) {
  const groupe = new Groupe();
  if (req.method == "GET") {
    try {
      const groupe = await groupe.fetch();
      return NextResponse.json({ groupe });
    } catch (error) {
      return NextResponse.json({ error: "failed to load groupe" });
    }
  }else{
    return NextResponse.json({ message: "hello from permission api" });
  }
}

export { handler as GET, handler as POST };
