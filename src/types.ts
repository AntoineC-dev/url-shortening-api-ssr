export const cookies = ["session", "refreshSession"] as const;
export type Cookie = typeof cookies[number];
