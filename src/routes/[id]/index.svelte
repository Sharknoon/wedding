<script lang="ts">
	import type { Details, Invitation } from '$lib/types';
	import Home from '$lib/components/home.svelte';
	import Info from '$lib/components/info.svelte';
	import Rsvp from '$lib/components/rsvp.svelte';
	import Map from '$lib/components/map.svelte';
	import FAQ from '$lib/components/faq.svelte';

	export let invitation: Invitation;
	export let details: Details;
</script>

<div class="h-screen w-screen snap-y snap-proximity overflow-y-scroll">
	<Home />
	<Info {details} />
	<Rsvp {invitation} {details} />
	<!--<Program {details} />-->
	<Map />
	<FAQ {details} />
</div>
