<script lang="ts">
    import { formatCurrency } from "$lib/utils";
	let props = $props();
</script>
<section>
    <a
      href={`/product/${props.slug}`}
      class=""
    >
      <img
        class="object-cover rounded-2xl"
        src={`${props.productAsset.preview}?w=200&h=200`}
        alt={props.productName}
      />
    </a>
    <p class="xl:text-center">{props.productName}</p>
    <p class="xl:text-center text-primary">
      {formatCurrency(props.priceWithTax.max) || 0}
    </p>
  </section>