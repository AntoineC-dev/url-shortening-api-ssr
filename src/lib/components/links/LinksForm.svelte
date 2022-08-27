<script lang="ts">
  import { user, loginUser, createLink } from "$lib/stores";

  let input: HTMLInputElement;
  let value = "";
  let state: "initial" | "submitting" | Error = "initial";

  const onInput = () => state instanceof Error && (state = "initial");
  const onSubmit = async () => {
    const formLink = value.trim();
    if (!formLink || typeof formLink !== "string" || formLink.length === 0) {
      state = new Error("Please add a link");
      return input.focus();
    }
    state = "submitting";
    const headers = new Headers({ "Content-Type": "application/json" });
    const body = JSON.stringify({ link: formLink });
    const response = await (await fetch("/api", { method: "POST", headers, body })).json();
    if (response.error) {
      state = new Error(response.error);
      return input.focus();
    }
    await createLink(response);
    state = "initial";
    value = "";
  };
</script>

<form
  on:submit|preventDefault={onSubmit}
  class="relative flex flex-col bg-secondary p-6 sm:p-8 md:px-10 lg:py-10 lg:px-12 gap-4 rounded-lg sm:flex-row shadow-sm bg-shorten"
>
  {#if !$user}
    <p class="absolute bottom-full mb-1 left-0 w-full text-center text-neutral-200 whitespace-nowrap">
      Please
      <button
        type="button"
        on:click={loginUser}
        class="underline text-neutral-200 hover:text-neutral-400 transition-colors duration-300"
      >
        login
      </button> to use the API
    </p>
  {/if}
  <div class="relative flex flex-col gap-1 sm:flex-1">
    <input
      type="text"
      aria-label="Link"
      on:input={onInput}
      bind:this={input}
      bind:value
      disabled={!$user}
      placeholder="Shorten a link here..."
      data-invalid={state instanceof Error}
      class="p-3 rounded-md bg-white placeholder:text-neutral-100 disabled:cursor-not-allowed"
    />
    {#if state instanceof Error}
      <span class="text-error text-xs absolute top-full mt-2">{state.message}</span>
    {/if}
  </div>
  <button disabled={state instanceof Error || state === "submitting" || !$user} class="btn btn-primary rounded-md">
    {state === "submitting" ? "Please wait..." : "Shorten It!"}
  </button>
</form>
