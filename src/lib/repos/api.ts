const API_BASE = "https://api.shrtco.de/v2";

export class ApiRepo implements App.ApiRepoInterface {
  getShortenLink = async (url: string) => {
    const response = (await (
      await fetch(`${API_BASE}/shorten?url=${url}`, { cache: "no-cache" })
    ).json()) as API.Response;
    if (response.ok) {
      const { original_link, full_short_link } = response.result;
      return { link: original_link, shorten_link: full_short_link } as Pick<App.Link, "link" | "shorten_link">;
    } else {
      return { error: response.error } as { error: string };
    }
  };
}
