<script lang="ts">
  import type { PageData } from './$types'
  import { browser } from '$app/environment'
  import ProductCard from '$lib/components/product-card.svelte'
  import CategoryBanner from '$components/category-banner.svelte';
  import { filtersStore } from '$stores/filters'
  import {SearchProductsStore, GetCollectionsStore} from "$houdini"
  let {data} : {data : PageData} = $props();

  //@ts-ignore
  let store : SearchProductsStore = $derived(data.products?.SearchProducts);
  //@ts-ignore
  let categories : GetCollectionsStore = $derived(data.categories?.GetCollections)

  let collections = $categories.data?.collections.items.filter(item => item.parent?.slug === data.slug)
  let products = $state($store.data?.search.items ?? [])
  let facets = $state($store.data?.search.facetValues ?? [])
  
</script>

<CategoryBanner {collections} />
<div class="flex">
<!--   {#if Object.entries(facetValues ?? {}).length >= 1}
    <Filters {facetValues} />
  {/if} -->
  <div
    class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
  >
    {#if products?.length >= 1}
      {#each products as item}
        <ProductCard {...item} /> 
      {/each}
    {/if}
  </div>
</div>
