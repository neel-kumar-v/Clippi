<script lang="ts">
  import Modal from './Modal.svelte';

  import { fade, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
  import j$ from 'jquery';

  let popoverVisible = false;
  let buttonsVisible = false;
  
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

  let openModal = async() => {
    j$("#rename-modal").toggleClass("invisible")
    j$("#rename-modal").toggleClass("visible")
  }

  let rewriteText = async(element: string) => {
    j$("rename-modal").prop("aria-modal")
  }


  let writeClipboard = async(element: string) => {

    await navigator.clipboard.writeText(element);
    popoverVisible = true
    await sleep(4)
    popoverVisible = false;
  }

  async function sleep(seconds: number) {
    return new Promise((resolve)=>setTimeout(resolve, seconds*1000))
  }

  let openDropdown = async(element: string) => {
    buttonsVisible = !buttonsVisible
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

<nav>
      <div class="duotone"><h1 class="font-serif text-cream font-extrabold mx-0 mt-3 px-4 border-cream border-b-8">Clippi</h1></div>

      <div class="card">
        <button on:click={readClipboard} class="clipboard-entry" title="Add link">
          What do I have copied?
        </button>
        
      </div>
    </nav>

