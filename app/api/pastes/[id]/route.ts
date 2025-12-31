import { NextResponse } from "next/server";
import { store } from "@/app/lib/store";
import { now } from "@/app/lib/time";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const paste = store.get(params.id);
  if (!paste) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const current = now(req);

  // TTL check
  if (paste.expiresAt && current > paste.expiresAt) {
    store.delete(params.id);
    return NextResponse.json({ error: "Expired" }, { status: 404 });
  }

  // Max views check
  if (paste.maxViews !== null && paste.views >= paste.maxViews) {
    store.delete(params.id);
    return NextResponse.json({ error: "View limit reached" }, { status: 404 });
  }

  paste.views++;

  return NextResponse.json({
    content: paste.content,
    remaining_views:
      paste.maxViews === null ? null : paste.maxViews - paste.views,
    expires_at: paste.expiresAt
      ? new Date(paste.expiresAt).toISOString()
      : null,
  });
}
