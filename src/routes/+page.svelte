<script>
	import { onMount } from "svelte";
	import ProductSection from "../components/Product.svelte";
	import { Target, GitCompare, LoaderCircle } from "lucide-svelte";

	let leftUrl = "";
	let rightUrl = "";
	let showComparison = false;
	let isloading = false;
	let productData1 = null;
	let productData2 = null;

	async function fetchProductData(url) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({
					imageUrl:
						"https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/5/i/7/-original-imahfu766ybd5h4z.jpeg?q=70&crop=false",
					title: "Product Title from " + url,
					price: "₹1,21,999",
					discount: "₹1,34,999",
					detail: [
						{ key: "Display Size", value: "17.27 cm (6.8 inch)" },
						{ key: "Resolution", value: "3120 x 1440 Pixels" },
						{ key: "Operating System", value: "Android 14" },
						{ key: "Processor", value: "Snapdragon 8 Gen 3" },
						{ key: "RAM", value: "12 GB" },
						{ key: "Internal Storage", value: "256 GB" },
						{ key: "Primary Camera", value: "200MP + 50MP + 12MP + 10MP" },
						{ key: "Secondary Camera", value: "12MP Front Camera" },
						{ key: "Battery Capacity", value: "5000 mAh" },
					],
				});
			}, 2000);
		});
	}

	async function handleCompare() {
		if (!leftUrl || !rightUrl) {
			alert("Please enter both product URLs.");
			return;
		}
		isloading = true;
		try {
			productData1 = await fetchProductData(leftUrl);
			productData2 = await fetchProductData(rightUrl);
			setTimeout(() => {
				showComparison = true;
				isloading = false;
			}, 1000); 
		} catch (error) {
			console.error("Error fetching product data:", error);
			isloading = false;
		}
	}
</script>

<div class="min-h-screen flex flex-col">
	<h1
		class="text-4xl italic font-bold text-center flex items-center gap-1 justify-center w-full"
	>
		<Target size={32} /> Compairo
	</h1>
	<div class="flex flex-col w-[85%] mx-auto">
		<div class="flex items-center justify-center px-5 py-8 gap-5">
			<input
				type="text"
				placeholder="Enter product URL"
				bind:value={leftUrl}
				class="w-full flex-1 px-4 py-2 border focus:border-gray-400 active:border-gray-400 hover:border-gray-300 rounded"
			/>
			<input
				type="text"
				placeholder="Enter product URL"
				bind:value={rightUrl}
				class="w-full flex-1 px-4 py-2 border focus:border-gray-400 active:border-gray-400 hover:border-gray-300 rounded"
			/>
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
		<div class="w-[85%] mx-auto my-4 gap-5 flex flex-col md:flex-row">
			<ProductSection product={productData1} />
			<ProductSection product={productData2} />
		</div>
	{/if}
</div>

<style>
</style>
