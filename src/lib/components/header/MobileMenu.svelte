<script lang="ts">
  import { goto } from "$app/navigation";
  import { menuItems } from "$lib/json";
  import { trapFocus, clickOutside } from "$lib/actions";
  import { user, loginUser, logoutUser } from "$lib/stores";

  let open = false;
  const toggle = () => (open = !open);

  let hamburger: HTMLElement;
  let top: HTMLElement;
  let middle: HTMLElement;
  let bottom: HTMLElement;
  $: translate = open ? 9 : 0; // gap + lineHeight
  $: rotate = open ? 45 : 0;
  $: opacity = open ? "0" : "1";
  $: top && (top.style.transform = `translateY(${translate}px) rotate(-${rotate}deg)`);
  $: middle && (middle.style.opacity = opacity);
  $: bottom && (bottom.style.transform = `translateY(-${translate}px) rotate(${rotate}deg)`);

  const onNavigate = (callback: () => void) => () => {
    toggle();
    callback();
  };
</script>

<nav
  use:trapFocus={{ shouldTrap: open, toggleElement: hamburger, closeCallback: toggle }}
  use:clickOutside={{ shouldListen: open, callback: toggle }}
  aria-label="Primary"
  class="md:hidden ml-auto"
>
  <button
    bind:this={hamburger}
    on:click={toggle}
    aria-label="{open ? 'Close' : 'Open'} menu"
    aria-expanded={open}
    aria-controls="menu-items"
    class="flex flex-col justify-center items-center gap-[6px] p-1 -mx-1 text-neutral-200"
  >
    <span bind:this={top} class="w-[26px] h-[3px] bg-current transition-transform duration-300 ease-in-out" />
    <span bind:this={middle} class="w-[26px] h-[3px] bg-current transition-opacity duration-300 ease-in-out" />
    <span bind:this={bottom} class="w-[26px] h-[3px] bg-current transition-transform duration-300 ease-in-out" />
  </button>
  <div
    id="menu-items"
    class:opacity-0={!open}
    class:pointer-events-none={!open}
    class="absolute top-full right-0 left-0 p-6 mt-6 bg-secondary text-white flex flex-col rounded-xl divide-y divide-neutral-100/25 transition-opacity duration-300"
  >
    <ul class="flex flex-col gap-2 pb-6">
      {#each menuItems as { href, label } (label)}
        <li>
          <button on:click={onNavigate(() => goto(href))} disabled={!open} class="btn btn-secondary w-full">
            {label}
          </button>
        </li>
      {/each}
    </ul>
    <div class="flex flex-col gap-4 pt-6 pb-4">
      {#if $user}
        <button on:click={onNavigate(logoutUser)} disabled={!open} class="btn btn-secondary">Logout</button>
      {:else}
        <button on:click={onNavigate(loginUser)} disabled={!open} class="btn btn-secondary">Login</button>
        <button on:click={onNavigate(loginUser)} disabled={!open} class="btn btn-primary">Sign Up</button>
      {/if}
    </div>
  </div>
</nav>
