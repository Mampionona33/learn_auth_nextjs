import Permission from "@/lib/mongo/permission";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

async function handler(req: NextApiRequest) {
  const permission = new Permission();
  if (req.method == "GET") {
    try {
      const permissions = await permission.fetch();
      return NextResponse.json({ permissions });
    } catch (error) {
      return NextResponse.json({ error: "failed to load permissions" });
    }
  } else {
    return NextResponse.json({ message: "hello from permission api" });
  }
}

export { handler as GET, handler as POST };
