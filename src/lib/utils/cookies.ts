import type { Cookie } from "$types";

export const getCookieValue = (cookie: string | null, name: Cookie): string | null =>
  cookie?.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || null;

export const createCookie = (props: { name: Cookie; cookie: string; maxAge: string | number }) =>
  `${props.name}=${props.cookie}; SameSite=Strict; Path=/; HttpOnly; Secure; Max-Age=${props.maxAge}`;

export const createExpiredCookie = (name: Cookie) => `${name}=; SameSite=Strict; Path=/; HttpOnly; Secure; Max-Age=0;`;
