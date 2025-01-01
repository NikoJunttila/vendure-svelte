<script lang="ts">
    import type {PageData} from "./$houdini"
    let {data} : {data : PageData} = $props();
    let {Collections} = $derived(data)
    let filtered = $Collections.data?.collections.items.filter((item) => item.parent?.name === "__root_collection__") ?? []

</script>
<div class="grid grid-cols-2 gap-1">
    {#each filtered as col}
    <a href={`category/${col.slug}`}>
        <div class="card bg-base-100 image-full w-96 shadow-xl">
            <figure>
                <img
                src={col.featuredAsset?.source}
                alt={col.featuredAsset?.name} />
            </figure>
            <div class="card-body">
                <h2 class="text-center text-white text-2xl">{col.name}</h2>
            </div>
        </div>
    </a>
    {/each}
</div>