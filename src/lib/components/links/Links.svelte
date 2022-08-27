<script lang="ts">
  import { flip } from "svelte/animate";
  import { links } from "$lib/stores";
  import LinksForm from "./LinksForm.svelte";
  import LinkCard from "./LinkCard.svelte";
</script>

<div class="flex flex-col gap-6">
  <LinksForm />
  <ul class="flex flex-col gap-4">
    {#each $links as props (props.id)}
      <li animate:flip>
        <LinkCard {props} />
      </li>
    {/each}
  </ul>
</div>
