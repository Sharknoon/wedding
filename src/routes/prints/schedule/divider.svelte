<script lang="ts">
	export let direction = 'down';
</script>

{#if direction === 'down'}
	<hr class="my-1 border-[2px] border-black" />
	<hr class="my-1 border border-black" />
{:else}
	<hr class="border border-black my-1" />
	<hr class="border-[2px] border-black my-1" />
{/if}
