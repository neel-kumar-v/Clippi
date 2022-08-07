<script lang="ts">
  import { getContext } from 'svelte'

    // import Navbar from './Navbar.svelte';
    // import Modal from './Modal.svelte'

    import { fade, scale } from 'svelte/transition'
    import { flip } from 'svelte/animate'
    // import { setContext } from 'svelte';
    // import j$ from 'jquery'

    // let popoverVisible = false
    // let buttonsVisible: [boolean] = [false]
    // buttonsVisible.shift()
    
    // let links: string[] = new Array()
    // let linkHrefs: string[] = new Array()
    // let clipboardText: string
    
    // const linkRegex: RegExp = new RegExp('https?:\/\/')

  
    // let readClipboard = async() => {
      
    //   clipboardText = await navigator.clipboard.readText()

    //   let isLink: boolean = false
    //   if(linkRegex.test(clipboardText)){
    //     clipboardText = truncateLink(clipboardText)
    //     isLink = true
    //   } 
      
    //   if(isLink && !links.includes(clipboardText) && !linkHrefs.includes(clipboardText)) {

    //     links.push(clipboardText)
    //     links = links

    //     linkHrefs.push(clipboardText)
    //     linkHrefs = linkHrefs

    //     buttonsVisible.push(false)

    //   }
      
      
    // }

    // let openModal = async(i: number) => {
    //   j$("#rename-modal:nth-of-type(" + i + ")").toggleClass("invisible")
    //   j$("#rename-modal:nth-of-type(" + i + ")").toggleClass("visible")
    // }

    // let writeClipboard = async(element: string) => {
      
    //   await navigator.clipboard.writeText(element);
    //   popoverVisible = true
    //   await sleep(2)
    //   popoverVisible = false
    // }
    
    // setContext('read', { readClipboard })
    // async function sleep(seconds: number) {
    //   return new Promise((resolve)=>setTimeout(resolve, seconds*1000))
    // }

    // let openDropdown = async(i: number) => {
    //   buttonsVisible[i] = !buttonsVisible[i]
    // }
    
    // function truncateLink(link: string) : string {
      
    //   if(link.substring(0, 5) == "https") link = link.replace("https://", "") 
    //   else link = link.replace("http://", "")

    //     // let linkEndingRegex = new RegExp('(com\/|org\/|net\/|co\...\/|us\/edu\/|io\/|gov\/)')
    //     // if(linkEndingRegex.test(link)) {
    //     //   const match = linkEndingRegex.exec(link)
    //     //   console.log(match)
    //     //   link = link.slice(0, linkEndingRegex.lastIndex)
    //     //   console.log(link) 
    //     // }

    //   return link
    // }
    // let removeEntry = (link: string) => {
    //   let index = links.indexOf(link)
    //   if(index === 0){
    //     links.shift()
    //     linkHrefs.shift()
    //   } 
    //   else {
    //     links.splice(index, index)
    //     linkHrefs.splice(index, index)
    //   }
      
    //   links = links
    //   linkHrefs = linkHrefs
      
    // }
    // function renameLink(i: number, changedName: string) {
    //   console.log(i)
    //   links[i] = changedName
    //   links = links
    // }

    // setContext('rename', { renameLink })

    // let hoveringOverContainer;
    // let itemIndex;
    

    // function dragStart(event: any, itemIndex: any) {
    // 	// The data we want to make available when the element is dropped
    //   // is the index of the item being dragged and
    //   // the index of the basket from which it is leaving.
    //   const data = itemIndex;
    //   event.dataTransfer.setData('text/plain', JSON.stringify(data));
    // }

    
    // function drop(event: any) {
    // 	event.preventDefault();
    //   const json = event.dataTransfer.getData("text/plain");
    // 	const data = JSON.parse(json);
    // 	// Remove the item from one basket.
    // 	// Splice returns an array of the deleted elements, just one in this case.
    // 	const [item] = links.splice(data.itemIndex, 1);
    //   const [itemHref] = linkHrefs.splice(data.itemIndex, 1)

      
    //   // Add the item to the drop target basket.
    // 	links.push(item);
    // 	links = links;
      

    // 	linkHrefs.push(item);
    // 	linkHrefs = linkHrefs;
    // 	hoveringOverContainer = null;
    // }

    // // 	hoveringOverContainer = null;
    // // }
  export let linkHrefs
  export let i
  export let element
  export let buttonsVisible

  const { writeClipboard } = getContext('write') 
  const { openModal } = getContext('openModal')
  const { openDropdown } = getContext('openDropdown') 
  const { removeEntry } = getContext('remove') 

</script>

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

    <button class="element-btn" on:click="{() => openModal(i)}" title="Edit link">
      <i class="fa-solid fa-pen"></i>
    </button> <!--edit button-->

    <button class="element-btn" on:click="{() => removeEntry(element)}" title="Remove link">
      <i class="fa-solid fa-trash"></i>
    </button> <!--delete button-->
  {/if} 
</figure>

