<script lang="ts">
	function scrollDown() {
		const element = document.querySelector('#info');
		if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<div id="home" class="flex min-h-screen snap-start flex-col items-center justify-between p-6">
	<div class="flex grow flex-col items-center lg:flex-row lg:justify-center lg:gap-12 xl:gap-48">
		<div
			class="grid aspect-square w-[15rem] grid-cols-2 grid-rows-1 md:w-[20rem] lg:w-[35rem] 2xl:w-[45rem]"
		>
			<div
				style="background-image: url('/images/people/midrene-and-josua.jpg')"
				class="image group col-start-1 row-start-1 flex items-end justify-center overflow-hidden bg-cover bg-center bg-no-repeat transition"
			>
				<div
					class="top mb-2 flex translate-y-12 flex-col items-center opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"
				>
					<span class="font-heading text-4xl">Konstanz</span>
					<span class="bg-black px-2 font-heading text-2xl text-white">Juni 2019</span>
				</div>
			</div>
			<div class="col-start-2 row-start-1 flex flex-col">
				<div class="group flex flex-1 items-end justify-center">
					<div
						class="text-center font-heading text-3xl uppercase tracking-widest transition group-hover:-translate-y-0.5 group-hover:scale-110 lg:text-4xl"
					>
						B l a c k
					</div>
				</div>
				<div class="group flex-1 bg-black">
					<div
						class="text-center font-heading text-3xl uppercase tracking-widest text-white transition group-hover:translate-y-0.5 group-hover:scale-110 lg:text-4xl"
					>
						W h i t e
					</div>
				</div>
			</div>
		</div>

		<div
			class="flex aspect-square max-w-full grow flex-col justify-center sm:gap-4 lg:grow-0 lg:gap-8"
		>
			<div
				class="text-center font-display text-4xl uppercase transition hover:-rotate-3 hover:drop-shadow-2xl lg:text-8xl"
			>
				Die Hochzeit
			</div>
			<div class="group pt-3 text-center font-heading text-3xl uppercase md:text-4xl">
				von <div class="inline-block text-red-600 transition group-hover:translate-x-[7.5rem]">
					Midrène
				</div>
				&
				<div class="inline-block text-red-600 transition group-hover:-translate-x-28">Josua</div>
			</div>
			<div class="group pb-1 text-center font-body text-lg lg:text-xl">
				Gesucht und Gefunden, in <span class="transition group-hover:text-red-600">Liebe</span> verbunden
			</div>
			<div class="group flex items-center gap-8">
				<div class="grow border-t-2 border-black transition group-hover:-translate-x-2" />
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-10 w-10 transition group-hover:scale-110"
					viewBox="0 0 20 20"
					fill="rgb(220,38,38)"
				>
					<path
						fill-rule="evenodd"
						d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
						clip-rule="evenodd"
					/>
				</svg>
				<div class="grow border-t-2 border-black transition group-hover:translate-x-2" />
			</div>
			<div class="group text-center font-heading text-3xl leading-none md:text-4xl">
				<span class="transition group-hover:text-red-600">23</span>. September 20<span
					class="transition group-hover:text-red-600">23</span
				>
			</div>
		</div>
	</div>
	<button on:click={scrollDown} class="text-gray-800">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-12 w-12 animate-bounce"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</button>
</div>
