<script lang="ts">
  import Modal from './components/Modal.svelte';

  import { fade, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
  import * as j$ from 'jquery'

  let visible = false;
  
  let links: string[] = new Array()
  let clipboardText: string;
  
  const linkRegex: RegExp = new RegExp('https?:\/\/')

  // let fillShape = () => {
  //   this.children[0].classList.remove('fa-solid')
  //   this.children[0].classList.add('fa-regular')
  // }
 
  let readClipboard = async() => {
    
    clipboardText = await navigator.clipboard.readText()
    
    if(linkRegex.test(clipboardText) && !links.includes(clipboardText)) {

      clipboardText = truncateLink(clipboardText)

      links.push(clipboardText)
      links = links
      
    }
    
    
  }

  let rewriteText = async(element: string) => {
    j$("rename-modal").prop("aria-modal")
  }


  let writeClipboard = async(element: string) => {

    await navigator.clipboard.writeText(element);
    visible = true
    await sleep(4)
    visible = false;
  }

  async function sleep(seconds: number) {
    return new Promise((resolve)=>setTimeout(resolve, seconds*1000))
  }
  
  function truncateLink(link: string) : string {
    
    if(link.substring(0, 5) == "https") link = link.replace("https://", "") 
    else link = link.replace("http://", "")

    // let linkEndingRegex = new RegExp('(com\/|org\/|net\/|co\...\/|us\/edu\/|io\/|gov\/)')
    // if(linkEndingRegex.test(link)) {
    //   const match = linkEndingRegex.exec(link)
    //   console.log(match)
    //   link = link.slice(0, linkEndingRegex.lastIndex)
    //   console.log(link) 
    // }

    return link
  }
  let removeEntry = (link: string) => {
    let index = links.indexOf(link)
    if(index === 0) links.shift()
    else links.splice(index, index)
    
    links = links
  }
</script>

<main>
    {#if visible}
      <div class="popover"
      in:fade="{{duration: 250}}"
      out:fade="{{duration: 250}}">
        Link copied!
      </div>
    {/if}
    <nav>
      <h1 class="font-serif font-extrabold m-3 p-1">Clippi</h1>

      <div class="card">
        <button on:click={readClipboard} class="clipboard-entry" title="Add link">
          What do I have copied?
        </button>
        
      </div>
    </nav>
    

    <Modal />


    <div class="entry-container">
      {#each links as element, i(element)}
        <figure 
          class="element"
          animate:flip = "{{duration: 300}}"
          out:scale="{{duration: 250}}"
          in:scale="{{duration: 250}}">
          <span class="mx-3 mb-3">
            <a href="https://{element}" target="_blank" id="linkname" rel="noreferrer noopener">{element}</a>
          </span>
          <br>

          <button tabindex="0" class="copy-btn element-btn" data-bs-toggle="popover" data-bs-trigger="focus"
          title="Copy link"
          data-bs-content="Link copied!" on:click={() => writeClipboard(element)}>
            <i class="fa-solid fa-clipboard"></i>
          </button> <!--copy link button-->

          <button class="element-btn" title="Edit link">
            <i class="fa-solid fa-pen"></i>
          </button> <!--edit button-->

          <button class="element-btn" on:click="{() => removeEntry(element)}" title="Remove link">
            <i class="fa-solid fa-trash"></i>
          </button> <!--delete button-->

          
        </figure>
      {/each}
    </div>
  
</main>