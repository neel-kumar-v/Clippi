<script lang="ts">
  import { fade, scale } from 'svelte/transition'
	import { flip } from 'svelte/animate'
  export let notification: string
</script>

<div class="popover"
in:fade="{{duration: 250}}"
out:fade="{{duration: 250}}">
  {notification}
</div>

