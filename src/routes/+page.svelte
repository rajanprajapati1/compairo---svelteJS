<script>
	import { onMount } from "svelte";
	import ProductSection from "../components/Product.svelte";
	import { Target, GitCompare, LoaderCircle } from "lucide-svelte";
	import LogoPicker from "../components/LogoPicker.svelte";
	import { getDomain, mapDomainToValue } from "../utils/function";
	import SupportedWebsites from "../components/SupportedWebsites.svelte";

	let leftUrl = "";
	let rightUrl = "";
	let showComparison = false;
	let isloading = false;
	let data = null;

	// Reactive declarations for isWebUrl1 and isWebUrl2
	$: isWebUrl1 = mapDomainToValue(getDomain(leftUrl));
	$: isWebUrl2 = mapDomainToValue(getDomain(rightUrl));

	console.log(isWebUrl1);

	async function fetchProductData(url) {
		try {
			const res = await fetch(
				`/api/scrape?url1=${leftUrl}&url2=${rightUrl}`,
			);
			const data = await res.json();
			return data;
		} catch (error) {
			return error;
		}
	}

	async function handleCompare() {
		if (!leftUrl || !rightUrl) {
			alert("Please enter both product URLs.");
			return;
		}
		isloading = true;
		try {
			data = await fetchProductData();
			showComparison = true;
			isloading = false;
		} catch (error) {
			console.error("Error fetching product data:", error);
			isloading = false;
		}
	}

	async function compareapi() {
		try {
			const res = await fetch(`/api/compare`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json", // Set the correct content type
				},
				body: JSON.stringify(
					`
ZEBRONICS 60.96 cm (24 inch) Full HD VA Panel Wall Mountable Monitor (ZEB-A24FHD LED)
 tell me about thi product i should purchase or not or which i should purchase`,
				),
			});
			const data = await res.json();
			console.log(data, "data");
		} catch (error) {
			return error;
		}
	}
</script>

<div class="min-h-screen flex flex-col">
	<SupportedWebsites />
	<button on:click={compareapi}>call</button>
	<h1
		class="text-4xl italic font-bold text-center flex items-center gap-1 justify-center w-full"
	>
		<Target size={32} /> Compairo
	</h1>
	<div class="flex flex-col w-[85%] mx-auto">
		<div class="flex items-center justify-center px-5 py-8 gap-5">
			<div class="flex-1 flex items-center justify-center gap-1">
				<div class="brand_icon h-full rounded">
					<LogoPicker isWeb={isWebUrl1} />
				</div>
				<input
					type="text"
					placeholder="Enter product URL"
					bind:value={leftUrl}
					class="w-full flex-1 px-4 py-2 border focus:border-gray-400 active:border-gray-400 hover:border-gray-300 rounded"
				/>
			</div>
			<div class="flex-1 flex items-center justify-center gap-1">
				<div class="brand_icon h-full rounded">
					<LogoPicker isWeb={isWebUrl2} />
				</div>
				<input
					type="text"
					placeholder="Enter product URL"
					bind:value={rightUrl}
					class="w-full flex-1 px-4 py-2 border focus:border-gray-400 active:border-gray-400 hover:border-gray-300 rounded"
				/>
			</div>
		</div>
		<div class="flex_button w-full flex items-center justify-center">
			<button
				on:click={handleCompare}
				class="px-6 py-2 flex items-center gap-2 bg-black text-white rounded hover:bg-black"
			>
				{#if isloading}
					<LoaderCircle
						class="animate-spin transition ease-in duration-75 "
					/>
					<span class="ml-2">Loading</span>
				{:else}
					<GitCompare class="-rotate-12" />
					<span class="ml-2">Compare</span>
				{/if}
			</button>
		</div>
	</div>

	{#if showComparison}
		<div class="w-[85%] mx-auto my-4 gap-5 flex mb-32 flex-col md:flex-row">
			<ProductSection product={data?.productData1} />
			<ProductSection product={data?.productData2} />
		</div>
	{/if}
</div>

<style>
</style>
