<script>
  import { ChevronDown, HandCoins, ShipWheel, ThumbsDown, ThumbsUp } from "lucide-svelte";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  export let IsDrawerShow;
  export let ReviewdData;
  export let onClose = ()=>{} ;

  onMount(() => {
    // Reactive statement to add/remove the 'no-scroll' class to the body element
    const updateBodyOverflow = () => {
      if (IsDrawerShow) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
    };
    updateBodyOverflow();

    // Watch for changes to IsDrawerShow
    $: IsDrawerShow, updateBodyOverflow();
  });

</script>

<div
  class={`bottom_drawers fixed bg-gray-800 shadow-lg bottom-0 left-0 right-0 py-6 px-6 z-[9999] h-[95vh] rounded-t-2xl transition-transform duration-300 ${
      IsDrawerShow ? "translate-y-0" : "translate-y-full"
  } text-white overflow-hidden`}
>
  {#if IsDrawerShow}
      <div transition:fade="{{ duration: 300 }}" class="flex flex-col h-full">
          <button on:click={onClose} class="text-xl  font-bold mb-4 text-center flex items-center justify-center gap-2">Product Comparison 
            <ChevronDown />
          </button>
          <div class="flex-grow overflow-y-auto space-y-6">
              {#each ReviewdData?.reviewdata as product}
                  <div class="bg-gray-900 p-4 rounded-lg shadow-sm">
                      <h3 class="text-lg font-semibold mb-2">{product?.name}</h3>
                      <p class="text-sm text-gray-400">{product?.revieweddata}</p>
                  </div>
              {/each}
          </div>
          <div class="mt-6 p-4 bg-gray-700 rounded-lg">
              <h3 class="text-lg font-bold text-white flex items-center gap-2"><HandCoins size={22} /> Final Decision</h3>
              <p class="text-sm text-gray-300 mt-2">{ReviewdData?.finaldecision}</p>
          </div>
          <div class="mt-4 p-4 bg-gray-700 rounded-lg">
              <h3 class="text-lg font-bold text-white flex items-center gap-2"><ShipWheel size={22} /> Conclusion</h3>
              <p class="text-sm text-gray-300 mt-2">{ReviewdData?.conclusion}</p>
          </div>
      </div>
  {/if}
</div>

<style>
  .bottom_drawers {
      will-change: transform;
  }

  ::-webkit-scrollbar {
      width: 8px;
  }

  ::-webkit-scrollbar-thumb {
      background: #4b5563;
      border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
      background: #6b7280;
  }
  .no-scroll {
    overflow: hidden;
  }
</style>
