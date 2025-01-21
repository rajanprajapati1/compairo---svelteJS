<script>
    export  let isWeb;
</script>

<div class=" h-full">
   <div class="logo aspect-auto rounded">
    {#if isWeb === 1}
    <img src="./amazon.png" class="w-10 h-10 aspect-square rounded" alt="amazon">
    {:else if isWeb === 2}
    <img src="./filpkart.png" class="w-12 h-12 aspect-square rounded" alt="filpkart">
    {:else}
    <img src="./web.png" class="w-11 h-11 aspect-square rounded" alt="web">
    {/if}
   </div>
</div>
