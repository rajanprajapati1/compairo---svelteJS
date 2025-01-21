<script>
    export let supportedWebsites = ["Amazon", "Flipkart"];
</script>

<div class="supported-websites fixed right-[1rem] bottom-[1rem] bg-white border px-2 py-1 border-blue-300 rounded  text-blue-800">
    <h2 class="text-lg font-semibold mb-1 text-pretty">Supported Websites</h2>
    <p class="mb-2 text-sm">
        This website currently supports data scraping and comparison for the following platforms:
        {#each supportedWebsites as website}
        <span class="bg-slate-100 px-1 py-0.5 mx-1 rounded">{website}</span>
    {/each}
    <!-- <p class="text-sm">
        We plan to add support for more platforms in the future. Stay tuned for updates!
    </p> -->
</div>

<style>
    .supported-websites {
        max-width: 300px;
    }
</style>
