<script lang="ts">

  import { getContext } from 'svelte'
  const { readClipboard } = getContext('read')

</script>

<nav>
    <h1 class="title">
      Clippi
    </h1>
    <div class="search">
      
      <input class="input" type="text" placeholder="Search links...">
      <i class="fa-solid fa-magnifying-glass"></i>
    </div>
    <button on:click={() => readClipboard()} class="clipboard-entry" title="Add link">
      What do I have copied?
    </button>
</nav>

