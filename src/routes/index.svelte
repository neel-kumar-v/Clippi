<script lang="ts">
  import Popover from './components/Popover.svelte';

  import Element from './components/Element.svelte';

  import Navbar from './components/Navbar.svelte';
  import Modal from './components/Modal.svelte'


  import { setContext } from 'svelte';
  import j$ from 'jquery'

  let copiedLinkPopoverVisible = false
  let buttonsVisible: [boolean] = [false]
  buttonsVisible.shift()
  
  let links: string[] = new Array()
  let savedLinks: string[] = new Array()
  let linkHrefs: string[] = new Array()
  let savedLinkHrefs: string[] = new Array()
  let clipboardText: string
  
  const linkRegex: RegExp = new RegExp('https?:\/\/')

 
  let readClipboard = async() => {
    
    clipboardText = await navigator.clipboard.readText()

    let isLink: boolean = false
    if(linkRegex.test(clipboardText)){
      clipboardText = truncateLink(clipboardText)
      isLink = true
    } 
    
    if(isLink && !links.includes(clipboardText) && !linkHrefs.includes(clipboardText)) {

      links.push(clipboardText)
      links = links
      savedLinks = links

      linkHrefs.push(clipboardText)
      linkHrefs = linkHrefs
      savedLinkHrefs = linkHrefs

      buttonsVisible.push(false)

    }
  }
  setContext('read', { readClipboard })

  function truncateLink(link: string) : string {
    if(link.substring(0, 5) == "https") link = link.replace("https://", "") 
    else link = link.replace("http://", "")
    return link
  }

  let writeClipboard = async(element: string) => {
    await navigator.clipboard.writeText(element);
    copiedLinkPopoverVisible = true
    await sleep(2)
    copiedLinkPopoverVisible = false
  }
  
  setContext('write', { writeClipboard })
  
  let openModal = async(i: number) => {
    console.log(i)
    j$("#rename-modal:nth-of-type(" + i + ")").toggleClass("invisible")
    j$("#rename-modal:nth-of-type(" + i + ")").toggleClass("visible")
  }
  setContext('openModal', { openModal })
  async function sleep(seconds: number) {
    return new Promise((resolve)=>setTimeout(resolve, seconds*1000))
  }

  let openDropdown = async(i: number) => {
    buttonsVisible[i] = !buttonsVisible[i]
  }
  setContext('openDropdown', { openDropdown})

  let removeEntry = (link: string) => {
    let index = links.indexOf(link)
    console.log(index)
    if(index === 0){
      links.shift()
      linkHrefs.shift()
    } 
    else {
      links.splice(index, index)
      linkHrefs.splice(index, index)
    }
    
    links = links
    linkHrefs = linkHrefs
    savedLinks = links
    savedLinkHrefs = linkHrefs
  }
  setContext('remove', { removeEntry })

  let renameLink = (i: number, changedName: string)  => {
    console.log(i)
    links[i] = changedName
    links = links
    savedLinks = links
  }
  setContext('rename', { renameLink })

  let hoveringOverContainer;
  let itemIndex;
	

	function dragStart(event: any, itemIndex: any) {
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
    const [itemHref] = linkHrefs.splice(data.itemIndex, 1)

		
    // Add the item to the drop target basket.
		links.push(item);
		links = links;
		

		linkHrefs.push(item);
		linkHrefs = linkHrefs;
		hoveringOverContainer = null;
	}

	// 	hoveringOverContainer = null;
	// }

  let search = (search: string) => {

    let searchResults = links.filter(word => word.includes("search"))
    links = searchResults
  }
  let unsearch = () => {
    let links = savedLinks
  }

</script>

<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore missing-declaration -->
<main>
  
    {#if copiedLinkPopoverVisible}
      <Popover notification="Link copied!"/>
    {/if}

    <Navbar />

    <div class="entry-container">
      {#each links as element, i(element)}
        <Modal index={i+1} />
        <Element linkHrefs={linkHrefs} i={i} element={element} buttonsVisible={buttonsVisible} />
      {/each}
    </div>
  
</main>