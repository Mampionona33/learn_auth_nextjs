import Groupe from "@/lib/mongo/groupe";
import { NextApiRequest, NextApiResponse } from "next";
import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import { NextResponse } from "next/server";

async function handler(req: NextApiRequest) {
  const groupe = new Groupe();
  if (req.method == "GET") {
    // console.log("req.searchParams:", req.url);
    const url = req.url
    const serachParams = URLSearchParams
    console.log(serachParams);
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

export { handler as GET, handler as POST };
