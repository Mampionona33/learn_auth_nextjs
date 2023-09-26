import User from "@/lib/mongo/users";
import { NextRequest, NextResponse } from "@/node_modules/next/server";

const handler = async (req: NextRequest, res: NextResponse) => {
  const newUsers = new User();
  if (req.method === "GET") {
    try {
      const { users, error } = await newUsers.getUsers();
      if (error) throw new Error(error);
      return res.status(200).json({ users });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
    // res.setHeader("Allow", ["GET"]);
    // res.status(425).end(`Method${req.method} is not allowed.`);
  }
};

export default handler;
