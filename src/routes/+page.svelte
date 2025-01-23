<script>
	import { onMount } from "svelte";
	import ProductSection from "../components/Product.svelte";
	import { Target, GitCompare, LoaderCircle, RefreshCcw, AudioLines, AudioWaveform, CornerDownRight } from "lucide-svelte";
	import LogoPicker from "../components/LogoPicker.svelte";
	import {
	  formatProductData,
	  getDomain,
	  mapDomainToValue,
	  parseJsonResponse,
	} from "../utils/function";
	import SupportedWebsites from "../components/SupportedWebsites.svelte";
	import BottomDrawer from "../components/BottomDrawer.svelte";
  
	let leftUrl = "";
	let rightUrl = "";
	let showComparison = false;
	let isloading = false;
	let data = null;
	let IsDrawerShow = false;
	let formattedData = null;
	let ReviewdData = null;
  
	// Reactive declarations for isWebUrl1 and isWebUrl2
	$: isWebUrl1 = mapDomainToValue(getDomain(leftUrl));
	$: isWebUrl2 = mapDomainToValue(getDomain(rightUrl));
  
	async function fetchProductData() {
	  try {
		const res = await fetch(`/api/scrape?url1=${leftUrl}&url2=${rightUrl}`);
		const data = await res.json();
		const product1 = formatProductData(data?.productData1);
		const product2 = formatProductData(data?.productData2);
		formattedData = { product1, product2 };
		console.log(product1, product2, "data");
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
		console.log(data, "data");
		showComparison = true;
		isloading = false;
	  } catch (error) {
		console.error("Error fetching product data:", error);
		isloading = false;
	  }
	}
  
	async function compareapi() {
	  if (!formattedData) {
		alert("Please compare products first.");
		return;
	  }
	  try {
		const res = await fetch(`/api/compare`, {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(formattedData),
		});
		const responseData = await res.json();
		ReviewdData = responseData;
		IsDrawerShow = true;
		console.log(ReviewdData, "data");
	  } catch (error) {
		console.error("Error comparing products:", error);
	  }
	}
  
	const ResetTheCompare = () => {
	  data = null;
	  leftUrl = "";
	  rightUrl = "";
	  formattedData = null;
	  ReviewdData = null;
	  showComparison = false;
	};
  
	const toggleDrawer = () => {
	  IsDrawerShow = !IsDrawerShow;
	};
  </script>
  
  <BottomDrawer {IsDrawerShow} ReviewdData={ReviewdData} onClose={toggleDrawer} />
  <div class="min-h-screen flex flex-col">
	<SupportedWebsites />
	<!-- <button on:click={compareapi}>Call</button> -->
	<h1
	  class="text-4xl z-10 italic relative font-bold text-center flex items-center gap-1 justify-center w-full"
	>
	  <button
	  on:click={toggleDrawer}  
	  >
		<Target size={32} 
	  class="z-20"
	  />
	  </button> Compairo
	 {#if showComparison && ReviewdData}
	 <div
	 role="button"
	 on:click={toggleDrawer}   
	 class="absolute -top-0  z-0 -rotate-[20deg] w-[12%] text-xs text-slate-300 ml-[-300px]">
	   You Can Click Here to Toggle  the Drawer  <br/>
	   <CornerDownRight class="ml-20" />
	 </div>
	 {/if}
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
	  <div class="flex_button w-full flex items-center flex-col justify-center">
	<div class="btn flex items-center justify-center gap-2">
		<button
		on:click={handleCompare}
		class="px-6 py-2 flex items-center gap-2 bg-black text-white rounded hover:bg-black"
	  >
		{#if isloading}
		  <LoaderCircle class="animate-spin transition ease-in duration-75 " />
		  <span class="ml-2">Loading</span>
		{:else}
		  <GitCompare class="-rotate-12" />
		  <span class="ml-2">Compare</span>
		{/if}
	  </button>
	  <button
		class="px-3 py-2 flex items-center gap-2 bg-black text-white rounded hover:bg-black"
		on:click={ResetTheCompare}
	  >
		<RefreshCcw />
	  </button>
	</div>
	{#if showComparison && data}
	<div class="compare_ai text-center text-gray-700 font-medium mt-2">
		<button on:click={compareapi} class="text-sm flex items-center gap-1 border-2 border-transparent  hover:border-b-orange-500"><AudioLines size={18} />Let us help you make the best choice in just seconds!</button>
	</div>
	{/if}
	
	  </div>
	</div>
  
	{#if showComparison && data}
	  <div class="w-[85%] mx-auto my-4 gap-5 flex mb-32 flex-col md:flex-row">
		<ProductSection product={data?.productData1} />
		<ProductSection product={data?.productData2} />
	  </div>
	{/if}
  </div>
  
  <style>
  </style>
  