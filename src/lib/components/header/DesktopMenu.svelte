<script lang="ts">
  import { menuItems } from "$lib/json";
  import { user, loginUser, logoutUser } from "$lib/stores";
</script>

<nav aria-label="Primary" class="hidden md:flex flex-1 justify-between ml-12">
  <ul class="w-full flex items-center gap-4 text-neutral-200 font-bold">
    {#each menuItems as { href, label } (label)}
      <li><a {href} class="p-2 hover:text-neutral-300 transition-colors duration-300">{label}</a></li>
    {/each}
    {#if $user}
      <li class="ml-auto">
        <button on:click={logoutUser} class="btn-sm btn-text">Logout</button>
      </li>
    {:else}
      <li class="ml-auto">
        <button on:click={loginUser} class="btn-sm btn-text">Login</button>
      </li>
      <li>
        <button on:click={loginUser} class="btn-sm btn-primary">Sign Up</button>
      </li>
    {/if}
  </ul>
</nav>
