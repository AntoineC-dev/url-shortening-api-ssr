import { error, type RequestHandler } from "@sveltejs/kit";
const ERROR_500 = "Sorry! We could not access the database";

// Get all links
export const GET: RequestHandler = async ({ locals }) => {
  const emptyResponse = new Response(JSON.stringify([]));
  if (!locals.user) return emptyResponse;
  try {
    const response = await locals.linksRepo.getAll();
    if (response) {
      return new Response(JSON.stringify(response));
    } else {
      return emptyResponse;
    }
  } catch (_) {
    throw error(500, ERROR_500);
  }
};

// Create link
export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals.user) throw error(403, ERROR_500);
  const props = (await request.json()) as Pick<App.DbLink, "link" | "shorten_link">;
  try {
    const response = await locals.linksRepo.createLink({ user_id: locals.user.id, ...props });
    if (response) {
      return new Response(JSON.stringify(response));
    } else {
      throw error(400, ERROR_500);
    }
  } catch (_) {
    throw error(500, ERROR_500);
  }
};

// Update link
export const PATCH: RequestHandler = async ({ request, locals }) => {
  const json = (await request.json()) as { id: string; props: Partial<Omit<App.Link, "id">> };
  try {
    const response = await locals.linksRepo.updateLink(json.id, json.props);
    if (response) {
      return new Response(JSON.stringify(response));
    } else {
      throw error(400, ERROR_500);
    }
  } catch (_) {
    throw error(500, ERROR_500);
  }
};

// Delete link
export const DELETE: RequestHandler = async ({ request, locals }) => {
  const id = (await request.json()) as Pick<App.DbLink, "id">;
  try {
    const response = await locals.linksRepo.deleteLink(id);
    if (response) {
      return new Response(JSON.stringify(response));
    } else {
      throw error(400, ERROR_500);
    }
  } catch (_) {
    throw error(500, ERROR_500);
  }
};
