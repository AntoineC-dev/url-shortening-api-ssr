<script lang="ts">
  import { statistics } from "$lib/json";
  import Links from "../links/Links.svelte";
  import StatisticCard from "./StatisticCard.svelte";
</script>

<section class="section mt-36 sm:mt-16 md:mt-8 bg-neutral">
  <div
    class="container flex flex-col gap-16 md:gap-24 -translate-y-20 sm:-translate-y-14 sm:pb-12 lg:-translate-y-16 lg:pb-16"
  >
    <Links />
    <div class="max-w-max mx-auto">
      <h2 class="h2 text-center mb-6">Advanced Statistics</h2>
      <p class="text-neutral-200 text-center max-w-[45ch]">
        Track how your links are performing across the web with our advanced statistics dashboard.
      </p>
    </div>
    <div
      class="container-xl flex flex-col items-center lg:justify-between lg:flex-row gap-20 lg:gap-8 xl:gap-12 mt-6 statistics-line lg:h-96"
    >
      {#each statistics as { content, src, title }, index (title)}
        <StatisticCard {content} {src} {title} {index} />
      {/each}
    </div>
  </div>
</section>
