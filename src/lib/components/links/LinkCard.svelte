<script lang="ts">
  import { updateLink } from "$lib/stores";
  import { copyToClipboard } from "$lib/utils";
  export let props: App.Link;

  let loading = false;
  const onUpdate = async () => {
    await copyToClipboard(props.shorten_link);
    if (props.copied) return;
    loading = true;
    await updateLink(props.id, { copied: true });
    loading = false;
  };
</script>

<div class="bg-white rounded-lg flex flex-col md:flex-row divide-y md:divide-y-0 md:items-center divide-neutral-100">
  <div class="p-4 truncate md:flex-1">
    <span>{props.link}</span>
  </div>
  <div class="p-4 flex flex-col xs:flex-row xs:items-center xs:justify-between gap-4">
    <span class="truncate text-primary">{props.shorten_link}</span>
    <button
      on:click={onUpdate}
      disabled={loading}
      class:btn-primary={!props.copied}
      class:btn-secondary={props.copied}
      class="btn-sm rounded-md"
    >
      {props.copied ? "Copied!" : "Copy"}
    </button>
  </div>
</div>
