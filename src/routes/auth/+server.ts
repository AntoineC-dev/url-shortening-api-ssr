import { error, json, type RequestHandler } from "@sveltejs/kit";

import { TWO_WEEKS_IN_SECONDS } from "$constants";
import { createCookie, createExpiredCookie } from "$lib/utils";

export const POST: RequestHandler = async ({ request, locals }) => {
  const authHeader = request.headers.get("Authorization") || "";
  const [scheme, accessToken] = authHeader.split(" ");
  if (scheme !== "Bearer" || !accessToken) {
    throw error(401, "invalid authorization header");
  }

  const { refreshToken, expiresIn } = await request.json();

  const sessionCookie = createCookie({ name: "session", cookie: accessToken, maxAge: expiresIn });
  const refreshCookie = createCookie({ name: "refreshSession", cookie: refreshToken, maxAge: TWO_WEEKS_IN_SECONDS });
  const user = await locals.userRepo.findByAccessToken(accessToken);

  const headers = new Headers();
  headers.append("set-cookie", sessionCookie);
  headers.append("set-cookie", refreshCookie);

  return json({ user }, { headers });
};

const expiredSessionCookie = createExpiredCookie("session");
const expiredRefreshCookie = createExpiredCookie("refreshSession");

export const DELETE: RequestHandler = ({ locals }) => {
  locals.userRepo.invalidateSession();

  const headers = new Headers();
  headers.append("set-cookie", expiredSessionCookie);
  headers.append("set-cookie", expiredRefreshCookie);

  return json(null, { headers });
};
