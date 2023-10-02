import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";

// Define a separate function for each HTTP method
export async function GET(req: NextApiRequest, { params }) {
  if (req.method == "GET") {
    try {
      const user = await prisma?.users.findFirst({ where: { id: params } });
      return NextResponse.json({ user });
    } catch (error) {
      return NextResponse.json({ error: error });
    }
  } else {
    return NextResponse.json({ message: "hello from permission api" });
  }
}

// Export the named functions
// export { handler as GET, handler as POST };
