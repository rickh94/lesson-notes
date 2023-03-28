<script lang="ts">
	import type { PracticeItem } from './practiceItem';

	export let data: PracticeItem[];
	export let baseId: string;
	export let title: string;
	export let richView: boolean;
</script>

{#if data.length > 0}
	{#if richView}
		<section
			id={baseId}
			class="my-8 bg-white shadow-md shadow-ash-gray rounded p-4 sm:p-8 flex flex-col border border-ash-gray"
		>
			<h2 class="font-bold text-2xl underline underline-offset-4 decoration-2 mb-2">
				{title}
			</h2>
			<!-- TODO: make either the navbar or sections full width on mobile -->
			{#each data as item (item.id)}
				<h4 class="font-bold text-xl text-carribean-current mt-2">{item.title}</h4>
				{#each item.notes.split('\n') as line}
					<p>{line}</p>
				{/each}
				{#each item.resources as resource}
					{#if resource}
						<p class="mt-2">
							<strong class="font-bold">Resource:</strong>&nbsp;
							{#if resource.includes('http')}
								<a
									href={resource}
									class="hover:underline text-blue-500"
									target="_blank"
									rel="noopener noreferrer"
								>
									{resource}
								</a>
							{:else}
								{resource}
							{/if}
						</p>
					{/if}
				{/each}
			{/each}
		</section>
	{:else}
		<section id={baseId + '-plain'}>
			<h2 class="font-bold text-2xl underline underline-offset-4 decoration-2 mt-2 mb-1">
				{title}
			</h2>
			{#each data as item (item.id)}
				<h4 class="font-bold text-xl mt-2">{item.title}</h4>
				{#each item.notes.split('\n') as line}
					<p>{line}</p>
				{/each}
				{#each item.resources as resource}
					{#if resource}
						<p class="mt-2">
							<strong class="font-bold">Resource:</strong>&nbsp;
							{#if resource.includes('http')}
								<a
									href={resource}
									class="hover:underline text-blue-500"
									target="_blank"
									rel="noopener noreferrer"
								>
									{resource}
								</a>
							{:else}
								{resource}
							{/if}
						</p>
					{/if}
				{/each}
			{/each}
		</section>
	{/if}
{/if}
