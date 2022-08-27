import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
  const links = await locals.linksRepo.getAll();
  return { user: locals.user, links };
};
