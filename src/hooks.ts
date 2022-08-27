import type { Handle } from "@sveltejs/kit";
import { getCookieValue, supabaseClient } from "$lib/utils";
import { ApiRepo, LinksRepo, UserRepo } from "$lib/repos";

const apiRepo = new ApiRepo();
const linksRepo = new LinksRepo(supabaseClient);
const userRepo = new UserRepo(supabaseClient);

// Handle
export const handle: Handle = async ({ event, resolve }) => {
  const cookie = event.request.headers.get("cookie");
  event.locals.apiRepo = apiRepo;
  event.locals.linksRepo = linksRepo;
  event.locals.userRepo = userRepo;
  const session = getCookieValue(cookie, "session");
  const refreshSession = getCookieValue(cookie, "refreshSession");

  let sessionCookie: string | undefined;
  let refreshCookie: string | undefined;
  if (session) {
    event.locals.user = await userRepo.findByAccessToken(session);
  } else {
    if (!refreshSession) {
      event.locals.user = null;
    } else {
      try {
        const result = await userRepo.refreshSession(refreshSession);
        event.locals.user = result.user;
        sessionCookie = result.sessionCookie;
        refreshCookie = result.refreshCookie;
      } catch (error) {
        event.locals.user = null;
      }
    }
  }

  const response = await resolve(event);
  if (sessionCookie && refreshCookie) {
    response.headers.set("Set-Cookie", `${sessionCookie}, ${refreshCookie}`);
  }
  return response;
};
