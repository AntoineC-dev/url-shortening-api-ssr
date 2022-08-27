import type { SupabaseClient } from "@supabase/supabase-js";
import { TWO_WEEKS_IN_SECONDS } from "$constants";

export class UserRepo implements App.UserRepoInterface {
  #client: SupabaseClient;

  constructor(client: SupabaseClient) {
    this.#client = client;
  }

  findByAccessToken = async (accessToken: string) => {
    this.#client.auth.setAuth(accessToken);

    const { user } = await this.#client.auth.api.getUser(accessToken);

    return user ? { id: user.id } : null;
  };

  refreshSession = async (refreshToken: string) => {
    const { session } = await this.#client.auth.setSession(refreshToken);

    if (session && session.user) {
      const sessionCookie = `session=${session.access_token}; SameSite=Strict; Path=/; HttpOnly; Max-Age=${session.expires_in}`;
      const refreshCookie = `refreshSession=${session.refresh_token}; SameSite=Strict; Path=/; HttpOnly; Max-Age=${TWO_WEEKS_IN_SECONDS}`;

      return {
        user: { id: session.user.id },
        sessionCookie,
        refreshCookie,
      };
    } else {
      throw new Error("Invalid refresh token");
    }
  };

  invalidateSession = () => {
    this.#client.auth.setAuth("");
  };
}
