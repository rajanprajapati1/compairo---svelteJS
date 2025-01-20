import adapter from "@sveltejs/adapter-vercel";
import { preprocessMeltUI, sequence } from '@melt-ui/pp'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
	}
	,
	preprocess: sequence([
		// ... other preprocessors
		preprocessMeltUI() // add to the end!
	  ])
};

export default config;
