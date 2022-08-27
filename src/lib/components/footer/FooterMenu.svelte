<script lang="ts">
  export let title: string;
  export let links: { label: string; href: string }[];
</script>

<div class="text-white text-center sm:text-left space-y-6">
  <h4 class="text-lg font-bold">{title}</h4>
  <ul class="leading-none space-y-4 text-neutral-200">
    {#each links as { href, label } (label)}
      <li><a {href} class="hover:text-primary transition-colors duration-300">{label}</a></li>
    {/each}
  </ul>
</div>
