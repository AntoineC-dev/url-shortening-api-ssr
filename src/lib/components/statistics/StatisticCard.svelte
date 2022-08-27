<script lang="ts">
  export let title: string;
  export let content: string;
  export let src: string;
  export let index: number;

  const getPosition = () => {
    if (index === 0) return "lg:self-start";
    if (index === 1) return "lg:self-center";
    return "lg:self-end";
  };
  let position = getPosition();
</script>

<div
  class="relative bg-white px-8 pb-10 pt-16 text-center lg:text-left rounded-md shadow-sm max-w-md lg:max-w-sm {position}"
>
  <div
    class="bg-secondary rounded-full p-4 lg:p-5 absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 lg:left-10 lg:translate-x-0"
  >
    <img {src} alt="" class="w-8 lg:w-9" />
  </div>
  <h3 class="text-xl xl:text-2xl font-bold mb-4">{title}</h3>
  <p class="text-neutral-200">{content}</p>
</div>
