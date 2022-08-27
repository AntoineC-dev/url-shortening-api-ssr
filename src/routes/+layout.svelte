<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import type { LayoutServerData } from "./$types";
  import { createSession, user, links } from "$lib/stores";
  import { Footer, Header } from "$lib/components";
  import { getValueFromHash } from "$lib/utils";

  export let data: LayoutServerData;
  $user = data.user;
  $links = data.links;

  onMount(async () => {
    const accessToken = getValueFromHash(window.location.hash, "access_token");
    const refreshToken = getValueFromHash(window.location.hash, "refresh_token");
    const expiresIn = getValueFromHash(window.location.hash, "expires_in");
    if (accessToken && refreshToken) {
      await createSession({ accessToken, refreshToken, expiresIn });
    }
  });
</script>

<div id="app-container">
  <Header />
  <slot />
  <Footer />
</div>
