import { error, type RequestHandler } from "@sveltejs/kit";

const ERROR_MESSAGE = "Sorry! We could not access the API";
export const POST: RequestHandler = async ({ request, locals }) => {
  const { link } = (await request.json()) as { link: string };
  try {
    const response = await locals.apiRepo.getShortenLink(link);
    return new Response(JSON.stringify(response));
  } catch (_) {
    throw error(500, ERROR_MESSAGE);
  }
};
