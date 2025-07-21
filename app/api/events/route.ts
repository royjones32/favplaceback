import { NextRequest, NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/redis";

// GET /api/events
export async function GET() {
  const events = await getCache("events") || [];
  return NextResponse.json(events);
}

// POST /api/events
export async function POST(req: NextRequest) {
  const body = await req.json();
  const events = await getCache("events") || [];
  const newEvent = { ...body, id: `e-${Date.now()}` };
  events.push(newEvent);
  await setCache("events", events);
  return NextResponse.json(newEvent, { status: 201 });
} 