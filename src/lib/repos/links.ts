import type { SupabaseClient } from "@supabase/supabase-js";
const LINK_KEYS = "id,link,shorten_link,copied";

export class LinksRepo implements App.LinkRepoInterface {
  #client: SupabaseClient;

  constructor(client: SupabaseClient) {
    this.#client = client;
  }

  getAll = async () => {
    const { data } = await this.#client.from<App.DbLink>("shorten_links").select("id, link, shorten_link, copied");
    return data ? (data as App.Link[]) : [];
  };

  createLink = async ({ user_id, link, shorten_link }: Pick<App.DbLink, "user_id" | "link" | "shorten_link">) => {
    const { data } = await this.#client
      .from<App.DbLink>("shorten_links")
      .insert([{ user_id, link, shorten_link }])
      .select(LINK_KEYS);
    console.log(data);
    return data ? (data[0] as App.Link) : null;
  };

  updateLink = async (id: string, props: Partial<Omit<App.Link, "id">>) => {
    const { data } = await this.#client.from<App.DbLink>("shorten_links").update(props).match({ id }).select(LINK_KEYS);
    return data ? (data[0] as App.Link) : null;
  };

  deleteLink = async (id: Pick<App.DbLink, "id">) => {
    const { data } = await this.#client.from<App.DbLink>("shorten_links").delete().match({ id });
    return data ? data[0] : null;
  };
}
