// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // User
  interface User {
    id: string;
  }

  type UserStore = User | null;

  interface UserRepoInterface {
    findByAccessToken(accessToken: string): Promise<User | null>;
    refreshSession(refreshToken: string): Promise<{
      user: User | null;
      sessionCookie: string;
      refreshCookie: string;
    }>;
    invalidateSession(): void;
  }

  // Links
  interface DbLink {
    id: string;
    user_id: string;
    link: string;
    shorten_link: string;
    copied: boolean;
    created_at: string;
  }

  type Link = Pick<DbLink, "id" | "link" | "shorten_link" | "copied">;

  type LinkStore = Link[];

  interface LinkRepoInterface {
    getAll(): Promise<Link[]>;
    createLink(props: Pick<DbLink, "user_id" | "link" | "shorten_link">): Promise<Link | null>;
    updateLink(id: string, props: Partial<Omit<App.Link, "id">>): Promise<Link | null>;
    deleteLink(id: Pick<DbLink, "id">): Promise<DbLink | null>;
  }

  // API
  interface ApiRepoInterface {
    getShortenLink(url: string): Promise<Pick<Link, "link" | "shorten_link"> | { error: string }>;
  }

  interface Locals {
    userRepo: UserRepoInterface;
    linksRepo: LinkRepoInterface;
    apiRepo: ApiRepoInterface;
    user: User | null;
  }
  // interface Platform {}
  // interface PrivateEnv {}
  // interface PublicEnv {}
}

declare module "$lib/assets/*.svg" {
  import type { SvelteComponentDev } from "svelte";
  const content: SvelteComponentDev;
  export default content;
}

declare namespace API {
  interface Success {
    ok: true;
    result: {
      code: string;
      short_link: string;
      full_short_link: string;
      short_link2: string;
      full_short_link2: string;
      share_link: string;
      full_share_link: string;
      original_link: string;
    };
  }

  interface Error {
    ok: false;
    error_code: number;
    error: string;
  }

  type Response = Success | Error;
}
