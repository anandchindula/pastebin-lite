import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { store } from "@/app/lib/store";
import { now } from "@/app/lib/time";

export async function POST(req: Request) {
  const body = await req.json();
  const { content, ttl_seconds, max_views } = body;

  if (!content || typeof content !== "string") {
    return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  }

  if (ttl_seconds !== undefined && ttl_seconds < 1) {
    return NextResponse.json({ error: "Invalid ttl_seconds" }, { status: 400 });
  }

  if (max_views !== undefined && max_views < 1) {
    return NextResponse.json({ error: "Invalid max_views" }, { status: 400 });
  }

  const id = nanoid();
  const created = now(req);

  store.set(id, {
    content,
    createdAt: created,
    expiresAt: ttl_seconds ? created + ttl_seconds * 1000 : null,
    maxViews: max_views ?? null,
    views: 0,
  });

  return NextResponse.json(
    {
      id,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/p/${id}`,
    },
    { status: 201 }
  );
}
