<script lang="ts">
	import { browser } from '$app/environment';
	import VendureLogo from '$lib/images/cube-logo-line-icon-nostroke.png';
	import {
		GetCollectionsStore,
		graphql,
		NavBarStore,
		fragment,
		type NavBarSummary,
	} from '$houdini';
	import { cartOpen } from '$stores/cart';
	import ShoppingCart from './icons/shopping-cart.svelte';

	const store = new GetCollectionsStore();

  let collections = $derived($store.data?.collections.items.filter((item) => item?.parent?.name === '__root_collection__') || [])

	// query directly in a component as it's relying on LocalStorage, we want to do it only in the browser
	const gql_NavBar : NavBarStore = graphql`
		query NavBar {
			activeOrder {
				...NavBarSummary
			}
		}
	`;
	// split with a fragment because we want to use it somewhere else as well

	let activeOrder : NavBarSummary | null | undefined = $derived($gql_NavBar.data?.activeOrder);

	let frag = $derived(
		fragment(
			activeOrder,
			graphql`
				fragment NavBarSummary on Order {
					id
					totalQuantity
				}
			`
		)
	);

	$effect(() => {
		if (browser) {
			store.fetch();
			gql_NavBar.fetch()
		}
	});
</script>

<nav class="navbar sticky top-0 z-30 bg-neutral text-neutral-content shadow-lg">
	<div class="navbar-start mx-2 px-2">
		<a href={`/`}>
			<img class="h-8" src={VendureLogo} alt="vendure logo" />
		</a>
		<div class="mx-2 hidden items-stretch px-2 lg:flex">
			{#each collections as collection}
				<a href={`/category/${collection.slug}`} class="btn btn-ghost btn-sm rounded-btn">
					{collection.name}
				</a>
			{/each}
		</div>

		<div class="dropdown dropdown-right lg:hidden">
			<div class="btn m-1">Links</div>
			<ul class="menu dropdown-content w-52 rounded-box bg-neutral p-2 text-neutral-content shadow">
				{#each collections as collection}
					<a href={`/category/${collection.slug}`} class="btn btn-ghost btn-sm rounded-btn">
						{collection.name}
					</a>
				{/each}
			</ul>
		</div>
	</div>

	<div class="navbar-center mx-2 hidden px-2 lg:flex"></div>
	<div class="navbar-end relative">
		<div class="relative flex items-center justify-center">
			<span
				class="absolute -right-1 -top-1 h-5 w-7 rounded-2xl bg-secondary text-center text-[70%] font-bold leading-[1.25rem] text-secondary-content"
			>
				{$frag?.totalQuantity || 0}
			</span>
			<button
				onclick={() => {
					$cartOpen = !$cartOpen;
				}}
				class="btn btn-square btn-ghost"
			>
				<ShoppingCart />
			</button>
		</div>
	</div>
</nav>
