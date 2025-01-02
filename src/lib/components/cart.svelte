<script lang="ts">
	import { clickOutside } from '$lib/utils';
	import { cartOpen } from '$stores/cart';
	import { fly } from 'svelte/transition';
	import ProductList from './ProductList.svelte';

	const handleClickOutside = () => {
		$cartOpen = !$cartOpen;
	};

</script>

{#if $cartOpen}
	<section
		use:clickOutside
		onclick_outside={handleClickOutside}
		in:fly={{ x: 200, duration: 150 }}
		out:fly={{ x: 400, duration: 150 }}
		class="fixed right-0 top-0 z-40 h-full w-[30rem] bg-base-100 px-8 pt-4 shadow-xl"
	>
		<div class="flex justify-between align-middle text-3xl">
			<button
				onclick={() => {
					$cartOpen = !$cartOpen;
				}}
				class="block"
			>
				&#10799;
			</button>
			<p>Cart</p>
		</div>
		<ProductList />
		<a href="checkout" class="btn btn-block">Checkout</a>
	</section>
{/if}
