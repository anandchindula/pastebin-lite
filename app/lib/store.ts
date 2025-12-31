export const store =
  (globalThis as any).__PASTE_STORE__ ??
  new Map<string, any>();

(globalThis as any).__PASTE_STORE__ = store;

console.log("🟢 STORE INSTANCE ID:", store);
