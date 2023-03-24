<script lang="ts">
	import { NotesData } from '$lib/notesData';
  import type { PageData } from './$types';

  export let data: PageData;
  $: notesData = new NotesData(data.warmups, data.exercises, data.pieces, data.generalNotes)

  function showPageData() {
    console.log(notesData);
  }
</script>

<main>
  <button on:click={showPageData}>Show page data</button>
</main> 
