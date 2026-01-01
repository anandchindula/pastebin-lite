import { NextResponse } from "next/server";
import { store } from "../../../lib/store";

export async function GET(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;

  const paste = store.get(id);

  if (!paste) {
    return NextResponse.json(
      { error: "Paste not found" },
      { status: 404 }
    );
  }

  // 🔴 Defensive fix (important)
  if (typeof paste.views !== "number") {
    paste.views = 0;
  }

  paste.views += 1;

  return NextResponse.json({
    content: paste.content,
    views: paste.views,
  });
}
