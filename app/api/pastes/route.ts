import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { store } from "@/app/lib/store";

export async function POST(req: Request) {
  const { content } = await req.json();

  if (!content || typeof content !== "string") {
    return NextResponse.json(
      { error: "content is required" },
      { status: 400 }
    );
  }

  const id = nanoid();

  store.set(id, {
    content,
    createdAt: Date.now(),
    expiresAt: null,
    maxViews: null,
    views: 0,   // 🔴 THIS LINE IS CRITICAL
  });

  return NextResponse.json({ id }, { status: 201 });
}
