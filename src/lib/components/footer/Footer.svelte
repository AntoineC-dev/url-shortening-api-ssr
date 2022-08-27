<script lang="ts">
  import { footerMenus } from "$lib/json";
  import Logo from "$lib/assets/icons/logo.svg";
  import FooterMenu from "./FooterMenu.svelte";
  import Facebook from "$lib/assets/icons/facebook.svg";
  import Twitter from "$lib/assets/icons/twitter.svg";
  import Pinterest from "$lib/assets/icons/pinterest.svg";
  import Instagram from "$lib/assets/icons/instagram.svg";

  const socials = [
    { Svg: Facebook, href: "/", label: "facebook" },
    { Svg: Twitter, href: "/", label: "twitter" },
    { Svg: Pinterest, href: "/", label: "pinterest" },
    { Svg: Instagram, href: "/", label: "instagram" },
  ];
</script>

<footer class="section bg-neutral-400 py-20">
  <div class="container flex flex-col xl:flex-row items-center xl:items-start gap-12 sm:gap-16 xl:gap-24">
    <div class="lg:flex-1">
      <a href="/" aria-label="Homepage" class="group">
        <Logo class="fill-white group-hover:fill-primary h-8 transition-colors duration-300" />
      </a>
    </div>
    <nav
      aria-label="Footer"
      class="flex flex-col gap-8 sm:grid sm:grid-cols-3 sm:gap-12 md:gap-16 sm:justify-items-center"
    >
      {#each footerMenus as { title, links } (title)}
        <FooterMenu {title} {links} />
      {/each}
    </nav>
    <div class="flex justify-center items-center gap-8">
      {#each socials as { Svg, href, label } (label)}
        <a {href} aria-label={label} class="group">
          <Svg class="w-6 sm:w-8 fill-white group-hover:fill-primary transition-colors duration-300" />
        </a>
      {/each}
    </div>
  </div>
</footer>
