export type Paste = {
  content: string;
  createdAt: number;
  expiresAt: number | null;
  maxViews: number | null;
  views: number;
};

export const store = new Map<string, Paste>();
