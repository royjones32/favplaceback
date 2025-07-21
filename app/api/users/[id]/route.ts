import { NextRequest, NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/redis";

// GET /api/users/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const users = await getCache("users") || [];
  const user = users.find((u: any) => u.id === params.id);
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(user);
}

// PUT /api/users/[id]
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  let users = await getCache("users") || [];
  users = users.map((u: any) => u.id === params.id ? { ...u, ...body } : u);
  await setCache("users", users);
  return NextResponse.json({ success: true });
}

// DELETE /api/users/[id]
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  let users = await getCache("users") || [];
  users = users.filter((u: any) => u.id !== params.id);
  await setCache("users", users);
  return NextResponse.json({ success: true });
} 