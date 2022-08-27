import { loginWithGithub, logout } from "$lib/utils";
import { writable } from "svelte/store";

export const user = writable<App.UserStore>(null);

export const loginUser = () => loginWithGithub();

export const createSession = async (props: { accessToken: string; refreshToken: string; expiresIn: string }) => {
  const headers = new Headers({ "Content-Type": "application/json", Authorization: `Bearer ${props.accessToken}` });
  const body = JSON.stringify({ refreshToken: props.refreshToken, expiresIn: props.expiresIn });
  const json = await (await fetch("/auth", { method: "POST", headers, body })).json();
  if (json) user.set(json.user);
};

export const logoutUser = async () => {
  const newUser = (await (await fetch("/auth", { method: "DELETE" })).json()) as App.UserStore;
  user.set(newUser);
  await logout();
};
