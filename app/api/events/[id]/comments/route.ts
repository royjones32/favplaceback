import { NextRequest, NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/redis";
import { publishToQueue } from "@/lib/rabbitmq";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const comments = await getCache(`comments_event_${params.id}`) || [];
  return NextResponse.json(comments);
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const comments = await getCache(`comments_event_${params.id}`) || [];
  const newComment = { ...body, id: `c-${Date.now()}` };
  comments.unshift(newComment);
  await setCache(`comments_event_${params.id}`, comments);
  await publishToQueue("comments", JSON.stringify(newComment));
  return NextResponse.json(newComment, { status: 201 });
} 