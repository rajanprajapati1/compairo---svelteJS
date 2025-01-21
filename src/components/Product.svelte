<script>
  export let product;
</script>

<div class="flex-1 p-4 overflow-y-auto bg-gray-50">
  <div
    class="aspect-square relative w-1/2 h-48 flex items-center justify-center mb-4"
  >
  <abbr class="w-full h-full" title={product.title}>

  <img
  src={product.imageUrl || "/placeholder.svg"}
  alt={product.title}
  class="w-full h-full object-contain"
/>
</abbr>
  </div>
  <h2
    class="text-xl font-semibold h-14 overflow-hidden text-ellipsis mb-2"
    style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; white-space: normal;"
  >
    {product.title}
  </h2>
  <p class="text-2xl font-bold mb-2">{product.price}</p>
  <p class="text-lg text-gray-500 line-through mb-4">{product.discount}</p>
  <div class="space-y-1">
    {#each product.detail as item}
      <div class="flex justify-between">
        <span class="font-semibold text-sm">{item.key}:</span>
        <span class="font-medium text-gray-400 text-sm">{item.value}</span>
      </div>
    {/each}
  </div>
</div>
