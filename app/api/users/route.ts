import User from "@/lib/mongo/users";
import { NextRequest, NextResponse } from "@/node_modules/next/server";

export async function GET() {
  const fetchedUsers = new User();
  try {
    const { users, error } = await fetchedUsers.getAll();
    if (error) throw new Error(error);
    const result = NextResponse.json({ users });
    return result;
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
