<script lang="ts">
  import { fade, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
  import j$ from 'jquery';
  let visible = false;
  let links: string[] = new Array()
  let clipboardText: string;

  export let i: number;
  export let link: String;

  $: j$(".linkname").text(String(j$("#renametext").val()));

  

  // let fillShape = () => {
  //   this.children[0].classList.remove('fa-solid')
  //   this.children[0].classList.add('fa-regular')
  // }

  let openModal = async() => {
    j$("#rename-modal").toggleClass("invisible")
    j$("#rename-modal").toggleClass("visible")
    j$("#renametext").val("");
  }
  
  let renameLink = async(i: number) => {
    // alert(j$(this).siblings())\
    // console.log(j$("#renametext").val())
    // console.log(j$(this).parentsUntil('.element').children(".linkname").children(".linkname").text())
    // j$(this).parentsUntil('.element').children(".linkname").children(".linkname").text(String(j$("#renametext").val()));
    // j$("#renametext").val("");
    // jquery  -> ith element -> span -> linkname
    // element[i]
    // j$("#linkname").text(String(j$("#renametext").val()));
    j$(".entry-container figure:nth-child(" + i + ")").children('span').children(".linkname").text(String(j$("#renametext").val()));
  }

  async function sleep(seconds: number) {
    return new Promise((resolve)=>setTimeout(resolve, seconds*1000))
  }
  
 
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
    
    <div id="rename-modal" class="absolute z-10 invisible" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <!--
        Background backdrop, show/hide based on modal state.
    
        Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
      -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    
      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <!--
            Modal panel, show/hide based on modal state.
    
            Entering: "ease-out duration-300"
              From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              To: "opacity-100 translate-y-0 sm:scale-100"
            Leaving: "ease-in duration-200"
              From: "opacity-100 translate-y-0 sm:scale-100"
              To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          -->
          <div class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
            <form>
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <!-- Heroicon name: outline/exclamation -->
                    <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Rename - This will retain the same link</h3>
                    <div class="mt-2">
                      <input type="text" name="renametext" id="renametext" class="text-black focus:border-blue-400 rounded-full outline" value={link}>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" on:click={() => {renameLink(i), openModal()}} class="modal-btn border-transparent  bg-red-600 text-white hover:bg-red-700  focus:ring-red-500">Rename</button>
                <button type="button" on:click={() => openModal()} class=" modal-btn mt-3 border-gray-300  bg-white text-gray-700 hover:bg-gray-50  focus:ring-indigo-500 sm:mt-0">Cancel</button>
              </div>
          </form>
          </div>
        </div>
      </div>
    </div>

