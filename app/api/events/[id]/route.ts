import { NextRequest, NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/redis";

// GET /api/events/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const events = await getCache("events") || [];
  const event = events.find((e: any) => e.id === params.id);
  if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(event);
}

// PUT /api/events/[id]
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  let events = await getCache("events") || [];
  events = events.map((e: any) => e.id === params.id ? { ...e, ...body } : e);
  await setCache("events", events);
  return NextResponse.json({ success: true });
}

// DELETE /api/events/[id]
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  let events = await getCache("events") || [];
  events = events.filter((e: any) => e.id !== params.id);
  await setCache("events", events);
  return NextResponse.json({ success: true });
} 