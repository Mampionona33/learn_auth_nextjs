import Permission from "@/lib/mongo/permission";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const permission = new Permission();
  if (req.method == "GET") {
    console.log("test");
    // console.log(await permission.fetch());
  }
}
