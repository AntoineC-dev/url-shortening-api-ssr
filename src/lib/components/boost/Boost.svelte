<script lang="ts">
  import { goto } from "$app/navigation";
</script>

<section class="section space-y-6 text-center bg-secondary text-white py-20 bg-boost">
  <h2 class="h2 font-bold">Boost your links today</h2>
  <button on:click={() => goto("/")} class="btn-lg btn-primary">Get Started</button>
</section>
