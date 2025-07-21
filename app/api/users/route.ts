import { NextRequest, NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/redis";

// GET /api/users
export async function GET() {
  const users = await getCache("users") || [];
  return NextResponse.json(users);
}

// POST /api/users
export async function POST(req: NextRequest) {
  const body = await req.json();
  const users = await getCache("users") || [];
  const newUser = { ...body, id: `u-${Date.now()}` };
  users.push(newUser);
  await setCache("users", users);
  return NextResponse.json(newUser, { status: 201 });
} 