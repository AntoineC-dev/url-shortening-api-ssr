import { supabaseClient } from "$lib/utils";
import { writable } from "svelte/store";

export const links = writable<App.LinkStore>([]);

export const createLink = async (props: Pick<App.Link, "link" | "shorten_link">) => {
  const headers = new Headers({ "Content-Type": "application/json" });
  const body = JSON.stringify(props);
  const newLink = (await (await fetch("/links", { method: "POST", headers, body })).json()) as App.Link;
  links.update((prev) => [...prev, newLink]);
};

export const updateLink = async (id: string, props: Partial<Omit<App.Link, "id">>) => {
  links.update((prev) => {
    const index = prev.findIndex((link) => link.id === id);
    prev[index] = { ...prev[index], ...props };
    return prev;
  });
  const headers = new Headers({ "Content-Type": "application/json" });
  const body = JSON.stringify({ id, props });
  await fetch("/links", { method: "PATCH", headers, body });
};

export const deleteLink = (id: App.Link["id"]) => {
  links.update((prev) => prev.filter((link) => link.id !== id));
  // CALL DELETE ENDPOINT
};

supabaseClient.auth.onAuthStateChange(async (event) => {
  if (event !== "SIGNED_OUT" && event !== "SIGNED_IN") return;
  const dbLinks = (await (await fetch("/links", { method: "GET" })).json()) as App.Link[];
  links.set(dbLinks);
});
