<script lang="ts">
	import { browser } from '$app/environment';
	import { AdjustOrderStore, type CartInfo, CartStore, fragment, graphql } from '$houdini';
	import { formatCurrency, clickOutside } from '$lib/utils';
	import { cartOpen } from '$stores/cart';
	import { fly } from 'svelte/transition';
	import Minus from './icons/minus.svelte';
	import Plus from './icons/plus.svelte';

	let fromMutation = false;

	const gql_Cart: CartStore = graphql`
		query Cart {
			activeOrder {
				...CartInfo
			}
		}
	`;
	const gql_AdjustOrder: AdjustOrderStore = graphql`
		mutation AdjustOrder($orderLineId: ID!, $quantity: Int!) {
			adjustOrderLine(
				orderLineId: $orderLineId
				quantity: $quantity
			) {
				... on Order {
					...CartInfo
					...NavBarSummary
				}
			}
		}
	`
	// split with a fragment because we want to use it somewhere else as well
	let activeOrder: CartInfo | null | undefined = $derived(
		fromMutation ? $gql_AdjustOrder.data?.adjustOrderLine : $gql_Cart.data?.activeOrder
	);

	let frag = $derived(
		fragment(
			activeOrder,
			graphql`
				fragment CartInfo on Order {
					lines {
						id
						unitPriceWithTax
						quantity
						linePriceWithTax
						productVariant {
							name
						}
						featuredAsset {
							preview
						}
					}
					shippingWithTax
					totalWithTax
				}
			`
		)
	);

	const adjustOrder = async (value: number, id: string) => {
		await gql_AdjustOrder.mutate({
			orderLineId: id,
			quantity: value
		});
		fromMutation = true;
	};

	const handleClickOutside = () => {
		$cartOpen = !$cartOpen;
	};

	$effect(() => {
		if (browser) {
			gql_Cart.fetch();
		}
	});
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
		{#each $frag?.lines ?? [] as item}
			<div class="my-6 flex">
				<div class="">
					<img
						src={`${item.featuredAsset!.preview}?w=300&h=300`}
						alt={item.productVariant.name}
						class="h-16 w-16 rounded-lg object-cover"
					/>
				</div>
				<div class="flex flex-grow flex-col pl-3 text-lg">
					<p class="pb-1 text-xl">{item.productVariant.name}</p>
					<div class="align-center flex justify-between">
						<p>
							{formatCurrency(item.unitPriceWithTax) || 0}
						</p>
						<div>
							<button
								onclick={() => adjustOrder(item.quantity > 0 ? item.quantity - 1 : 0, item.id)}
								class="btn btn-outline btn-xs shadow-md hover:btn-primary"
							>
								<Minus />
							</button>
							<span>{item.quantity}</span>
							<button
								onclick={() => adjustOrder(item.quantity + 1, item.id)}
								class="btn btn-outline btn-xs shadow-md hover:btn-primary"
							>
								<Plus />
							</button>
						</div>
						<p>
							{formatCurrency(item.linePriceWithTax) || 0}
						</p>
					</div>
				</div>
			</div>
		{:else}
			<p class="text-3xl text-center pt-8 text-base-300">Cart is empty</p>
		{/each}
		<span class="divider"></span>
		<div class="flex justify-between align-middle text-lg">
			<p>Shipping</p>
			<p>
				{formatCurrency($frag?.shippingWithTax) || 0}
			</p>
		</div>
		<!-- svelte-ignore element_invalid_self_closing_tag -->
		<span class="divider" />
		<div class="mb-10 flex justify-between align-middle text-lg">
			<p class="text-xl">Total</p>
			<p>
				{formatCurrency($frag?.totalWithTax) || 0}
			</p>
		</div>
		<button class="btn btn-block">Checkout</button>
	</section>
{/if}
