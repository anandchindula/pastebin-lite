import { notFound } from "next/navigation";
import { store } from "@/app/lib/store";
import { now } from "@/app/lib/time";

export default function PastePage({ params }: { params: { id: string } }) {
  const paste = store.get(params.id);
  if (!paste) notFound();

  const current = now();

  if (paste.expiresAt && current > paste.expiresAt) {
    store.delete(params.id);
    notFound();
  }

  if (paste.maxViews !== null && paste.views >= paste.maxViews) {
    store.delete(params.id);
    notFound();
  }

  paste.views++;

  return (
    <main style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h2>Paste</h2>
      <pre>{paste.content}</pre>
    </main>
  );
}
