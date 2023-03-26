<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let title = 'Dialog Title';
	export let content = 'Dialog content goes here.';
	export let isOpen = false;
	export let cancelLabel = 'Cancel';
	export let confirmLabel = 'Confirm';
	export let confirmColor = 'bg-carribean-current';
	export let cancelColor = 'bg-wine';
	export let buttons = true;

	const dispatch = createEventDispatcher<{ answer: boolean }>();

	function confirmDialog() {
		dispatch('answer', true);
	}

	function cancelDialog() {
		dispatch('answer', false);
	}
</script>

{#if isOpen}
	<div
		class="fixed top-0 left-0 w-full h-full bg-ash-gray opacity-70 z-10 transition duration-200 ease-out"
		transition:fade={{ duration: 200 }}
	/>
{/if}
<dialog
	class="rounded shadow-md bg-white shadow-ash-gray p-4 border border-ash-gray z-20 transition duration-200 ease-out"
	style="top: 33vh;"
	open={isOpen}
	on:close={cancelDialog}
	transition:fade={{ duration: 200 }}
>
	<div class="">
		<div class="mb-4">
			<h2 class="text-2xl underline underline-offset-4 font-bold">{title}</h2>
		</div>
		<div class="mb-6">
			<p class="text-gray-700">{content}</p>
		</div>
		{#if buttons}
			<div class="flex justify-end space-x-4">
				<button
					class={`px-6 py-2 text-lg shadow-ash-gray text-white rounded shadow focus:outline-none ` +
						cancelColor}
					on:click={cancelDialog}>{cancelLabel}</button
				>
				<button
					class={`px-6 py-2 text-lg text-white rounded focus:outline-none ` + confirmColor}
					on:click={confirmDialog}>{confirmLabel}</button
				>
			</div>
		{/if}
	</div>
</dialog>
