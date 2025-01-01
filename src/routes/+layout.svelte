<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import Transition from '$components/transition.svelte';
	import Navbar from '$components/navbar.svelte';
	import Cart from '$components/cart.svelte';
	import Footer from '$components/footer.svelte';
	import '../app.css';
	let { children, data } = $props();
</script>

<ParaglideJS {i18n}>
	<Navbar />
	<Cart />
	<Transition key={data.url} duration={200}>
			<div class="grid place-items-center py-2">
				{@render children()}
			</div>
	</Transition>
	<Footer />
</ParaglideJS>
