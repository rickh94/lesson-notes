<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { PracticeItem } from './practiceItem';
	export let item: PracticeItem;
	export let itemType: string;

	let dispatch = createEventDispatcher<{ delete: { id: number } }>();
	let textRows = 4;
	$: {
		const lines = item.notes.split('\n').length;
		if (lines > 4) {
			textRows = lines;
		} else {
			textRows = 4;
		}
	} 

	function addResource() {
		item.resources.push('');
		item = item;
	}

	function deleteMe() {
		dispatch('delete', { id: item.id });
	}
</script>

<div id={`${itemType}${item.id}-info`} class="my-6 grid grid-cols-5 gap-2 mx-4">
	<!-- TODO: allow typing notes and metronome marks in some way -->
	<label for={`${itemType}${item.id}-title`} class="font-bold text-xl col-span-1">Title</label>
	<input
		bind:value={item.title}
		type="text"
		class="rounded mx-4 w-full px-2 py-1 border-2 border-gray-200 focus:border-cool-gray focus:outline-none col-span-4"
		id={`${itemType}${item.id}-title`}
	/>

	<label for={`${itemType}${item.id}-notes`} class="col-span-1 font-bold text-xl">Notes</label>
	<textarea
		bind:value={item.notes}
		name={`${itemType}${item.id}-notes`}
		id={`${itemType}${item.id}-notes`}
		rows={textRows}
		class="col-span-4 mx-4 rounded w-full px-2 py-1 border-2 border-gray-200 focus:border-cool-gray focus:outline-none"
	/>

	{#each item.resources as resource, idx (idx)}
		<label for={`${itemType}${item.id}-resource${idx}`} class="font-bold text-xl col-span-1"
			>Resource</label
		>
		<input
			bind:value={resource}
			type="text"
			class="rounded mx-4 w-full px-2 py-1 border-2 border-gray-200 focus:border-cool-gray focus:outline-none col-span-4"
			id={`${itemType}${item.id}-resource${idx}`}
		/>
	{/each}

	<div id={`${itemType}${item.id}-add-resource`} class="flex justify-start col-span-5 space-x-2">
		<button
			on:click={deleteMe}
			class="px-8 bg-wine py-2 font-bold text-lg rounded text-white shadow shadow-ash-gray"
			>Delete</button
		>
		<button
			on:click={addResource}
			class="px-8 bg-air-superiority-blue py-2 font-bold text-lg rounded text-white shadow shadow-ash-gray"
			>Add Resource</button
		>
	</div>
</div>
