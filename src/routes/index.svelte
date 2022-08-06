<script lang="ts">

  import Modal from './components/Modal.svelte'

  import { fade, scale } from 'svelte/transition'
	import { flip } from 'svelte/animate'
  import j$ from 'jquery'

  let popoverVisible = false
  let buttonsVisible: [boolean] = [false]
  buttonsVisible.shift()
  
  let links: string[] = new Array()
  let clipboardText: string
  
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
      buttonsVisible.push(false)
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
    popoverVisible = false
  }

  async function sleep(seconds: number) {
    return new Promise((resolve)=>setTimeout(resolve, seconds*1000))
  }

  let openDropdown = async(element: HTMLButtonElement, i: number) => {
    buttonsVisible[i] = !buttonsVisible[i]
    let parent = <HTMLButtonElement>element.parent()
    if(buttonsVisible[i]) {

    } else {

    }
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

  // while(true) {
    
  // }
  let hoveringOverContainer;
  let itemIndex;
	
	function dragStart(event: Event, itemIndex: any) {
		// The data we want to make available when the element is dropped
    // is the index of the item being dragged and
    // the index of the basket from which it is leaving.
    const data = itemIndex;
    event.dataTransfer.setData('text/plain', JSON.stringify(data));
	}
	
	function drop(event: any) {
		event.preventDefault();
    const json = event.dataTransfer.getData("text/plain");
		const data = JSON.parse(json);
		
		// Remove the item from one basket.
		// Splice returns an array of the deleted elements, just one in this case.
		const [item] = links.splice(data.itemIndex, 1);
		
    // Add the item to the drop target basket.
		links.push(item);
		links = links;
		
		hoveringOverContainer = null;
	}
</script>

<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore missing-declaration -->
<main>
    {#if popoverVisible}
      <div class="popover"
      in:fade="{{duration: 250}}"
      out:fade="{{duration: 250}}">
        Link copied!
      </div>
    {/if}

    <nav>
        <h1 class="title">Clippi</h1>
        <button on:click={readClipboard} class="clipboard-entry" title="Add link">
          What do I have copied?
        </button>
    </nav>
    


    <div class="entry-container"
    on:drop="{event => drop(event)}">

      {#each links as element, i(element)}
        <figure 
          class="element"
          animate:flip = "{{duration: 300}}"
          out:scale="{{duration: 250}}"
          in:scale="{{duration: 250}}"
          draggable={true}
          on:dragstart={event => dragStart(EventTarget, itemIndex)}>

            <span class="mb-3 truncate">
              <a href="https://{element}" target="_blank" id="linkname" rel="noreferrer noopener"class="linkname link">
                {element}
              </a>
            </span>
            
            <button class="element-btn dropdown-btn" on:click="{() => openDropdown(this, i)}">
              <i class="fa-solid fa-caret-down"></i>
            </button>
            
            <Modal />
            
            <!-- <br> -->

            {#if buttonsVisible[i] != undefined && buttonsVisible[i]} 
              <button tabindex="0" class="copy-btn element-btn" data-bs-toggle="popover" data-bs-trigger="focus"
              title="Copy link"
              data-bs-content="Link copied!" on:click="{() => writeClipboard(element)}">
                <i class="fa-solid fa-clipboard"></i>
              </button> <!--copy link button-->

              <button class="element-btn" on:click="{() => openModal()}" title="Edit link">
                <i class="fa-solid fa-pen"></i>
              </button> <!--edit button-->

              <button class="element-btn" on:click="{() => removeEntry(element)}" title="Remove link">
                <i class="fa-solid fa-trash"></i>
              </button> <!--delete button-->
            {/if} 
          </figure>
      {/each}
    </div>
  
</main>