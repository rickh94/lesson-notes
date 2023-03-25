<script lang="ts">
	import { NotesData } from '$lib/notesData';
	import type { PageData } from './$types';

	export let data: PageData;
	$: notesData = new NotesData(data.warmups, data.exercises, data.pieces, data.generalNotes);

	let richView = false;

	function copyLink() {
		throw 'not implemented';
	}

	function createNew() {
		throw 'not implemented';
	}
</script>

<div class="p-2 w-full top-0 fixed">
	<header
		class="w-full rounded p-2 md:px-4 bg-white border-carribean-current border-2 shadow-md bg-opacity-90 flex flex-wrap space-y-2 sm:space-y-0 items-center justify-between"
	>
		<div>
			<h1 class="text-3xl pl-2 text-black font-bold">
				<time datetime={notesData.date.toISOString()}>
					{notesData.date.toDateString()}
				</time>
			</h1>
		</div>
		<div class="space-x-2 flex justify-end w-full sm:w-auto">
			<div class="flex justify-center">
				<div>
					<span class="inline-block pl-[0.15rem] hover:cursor-pointer">Plain View</span>
					<input
						class="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary"
						class:b={}
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
	</header>
</div>

<main />
