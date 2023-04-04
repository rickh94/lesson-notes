<script lang="ts">
	import { page } from '$app/stores';
	import { NotesData } from '$lib/notesData';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import DisplaySection from '$lib/DisplaySection.svelte';

	export let data: PageData;
	$: notesData = new NotesData(
		data.warmups,
		data.exercises,
		data.pieces,
		data.generalNotes,
		data.date
	);

	let richView = true;
	let copyInput: HTMLInputElement;

	function copyLink() {
		navigator.clipboard.writeText(copyInput.value);
	}

	function createNew() {
		goto(`/`);
	}
</script>

{#if richView}
	<div class="fixed top-0 left-0 -z-40 bg-ivory h-screen w-screen" />
{/if}

<input type="hidden" name="pageUrl" id="pageUrl" value={$page.url} bind:this={copyInput} />

<div class="p-2 w-full top-0 fixed z-10">
	<header
		class="w-full rounded p-2 md:px-4 bg-white border-carribean-current border-2 shadow-md bg-opacity-90 flex flex-wrap space-y-2 sm:space-y-0 items-center justify-between"
	>
		<div class="w-full sm:w-auto">
			<h1 class="text-3xl pl-2 text-black font-bold text-center">
				<time datetime={notesData.date.toISOString()}>
					{notesData.date.toDateString()}
				</time>
			</h1>
		</div>
		<div
			class="space-x-2 space-y-2 sm:space-y-0 flex-col sm:flex-row flex justify-end w-full sm:w-auto"
		>
			<div class="flex justify-center items-center mr-2">
				<div>
					<span class="inline-block pl-[0.15rem] hover:cursor-pointer">Plain View</span>
					<input
						class="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary"
						class:bg-neutral-300={!richView}
						class:bg-carribean-current={richView}
						type="checkbox"
						role="switch"
						id="flexSwitchCheckDefault"
						bind:checked={richView}
					/>
					<label class="inline-block pl-[0.15rem] hover:cursor-pointer" for="flexSwitchCheckDefault"
						>Rich View</label
					>
				</div>
			</div>
			<div class="flex justify-center sm:justify-end space-x-2">
				<button
					on:click={createNew}
					class="px-8 bg-wine text-xl rounded shadow shadow-ash-gray font-bold h-12 flex items-center text-white"
					>New</button
				>
				<button
					on:click={copyLink}
					class="px-8 bg-carribean-current shadow shadow-ash-gray text-xl rounded font-bold h-12 flex items-center text-white"
					>Copy Link</button
				>
			</div>
		</div>
	</header>
</div>

<main class="max-w-6xl px-4 mx-auto z-10">
	<div class="h-48 sm:h-32" />
	<DisplaySection data={data.warmups} title="Warmups and Scales" baseId="warmups" {richView} />
	<DisplaySection
		data={data.exercises}
		title="Etudes and Exercises"
		baseId="exercises"
		{richView}
	/>
	<DisplaySection data={data.pieces} title="Pieces" baseId="pieces" {richView} />
	{#if data.generalNotes}
		{#if richView}
			<section
				id="general-notes"
				class="my-8 bg-white shadow-md shadow-ash-gray rounded p-4 sm:p-8 flex flex-col border border-ash-gray"
			>
				<h2 class="font-bold text-2xl underline underline-offset-4 decoration-2 mb-4">
					General Notes
				</h2>
				{#each data.generalNotes.split('\n') as line}
					<p>{line}</p>
				{/each}
			</section>
		{:else}
			<section id="general-notes">
				<h2 class="font-bold text-2xl underline underline-offset-4 decoration-2 mb-4">
					General Notes
				</h2>
				{#each data.generalNotes.split('\n') as line}
					<p>{line}</p>
				{/each}
			</section>
		{/if}
	{/if}
</main>
