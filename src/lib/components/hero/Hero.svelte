<script lang="ts">
  import { goto } from "$app/navigation";
  import HeroSVG from "$lib/assets/images/hero.svg";
</script>

<section class="section py-6 sm:py-16 md:py-20 lg:py-24">
  <div class="container flex flex-col md:flex-row items-center gap-12 md:justify-between">
    <div class="w-[min(100%,48rem)] md:order-1 md:basis-[45%]">
      <HeroSVG class="w-[min(150%,48rem)]" />
    </div>
    <div class="flex flex-col items-center md:items-start text-center md:text-start gap-6 md:basis-1/2">
      <h1 class="h1 max-w-[15ch]">More than just shorter links</h1>
      <p class="text-neutral-200 max-w-[40ch] xs:text-lg">
        Build your brand’s recognition and get detailed insights on how your links are performing.
      </p>
      <button on:click={() => goto("/")} class="btn-lg btn-primary">Get Started</button>
    </div>
  </div>
</section>
