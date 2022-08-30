<script lang="ts">
  import { getContext } from 'svelte'
  import { fade, scale } from 'svelte/transition'

  export let linkHrefs
  export let i
  export let element
  export let buttonsVisible

  const { writeClipboard } = getContext('write') 
  const { openModal } = getContext('openModal')
  const { openDropdown } = getContext('openDropdown') 
  const { removeEntry } = getContext('remove') 



</script>


<div class="card w-96 bg-base-100 shadow-xl image-full" out:scale="{{duration: 250}}" in:scale="{{duration: 250}}" draggable={true}>
  <figure><img src="{}" alt="Shoes" /></figure>
  <div class="card-body">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>

<figure 
class="element"
out:scale="{{duration: 250}}"
in:scale="{{duration: 250}}"
draggable={true}>
  <span class="mb-3 truncate">
    <a href="https://{linkHrefs[i]}" target="_blank" id="linkname"  class="linkname link">
      {element}
    </a>
  </span>
  
  <button class="element-btn dropdown-btn" on:click="{() => openDropdown(i)}">
    <i class="fa-solid fa-caret-down"></i>
  </button>
  
  <br>

  {#if buttonsVisible[i] != undefined && buttonsVisible[i]} 
    <button tabindex="0" class="copy-btn element-btn" data-bs-toggle="popover" data-bs-trigger="focus"
    title="Copy link"
    data-bs-content="Link copied!" on:click="{() => writeClipboard(element)}">
      <i class="fa-solid fa-clipboard"></i>
    </button> <!--copy link button-->

    <label for="my-modal" class="element-btn"><i class="fa-solid fa-pen"></i></label>

    <button class="element-btn" on:click="{() => removeEntry(element)}" title="Remove link">
      <i class="fa-solid fa-trash"></i>
    </button> <!--delete button-->
  {/if} 
</figure>

