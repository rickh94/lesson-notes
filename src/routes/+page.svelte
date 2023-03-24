<script lang="ts">
	import { NotesData } from "$lib/notesData";
	import { PracticeItem } from "$lib/practiceItem";
  import PracticeItemForm from "$lib/PracticeItemForm.svelte";
  import { goto } from '$app/navigation';


  let data = new NotesData();

  function addWarmup() {
    data.warmups.push(new PracticeItem());
    data = data;
  }

  function deleteWarmup(event: CustomEvent<{id: number}>) {
    data.warmups = data.warmups.filter(warmup => warmup.id != event.detail.id);
  }

  function addExercise() {
    data.exercises.push(new PracticeItem());
    data = data;
  }

  function deleteExercise(event: CustomEvent<{id: number}>) {
    data.exercises = data.exercises.filter(warmup => warmup.id != event.detail.id);
  }
  
  function addPiece() {
    data.pieces.push(new PracticeItem());
    data = data;
  }

  function deletePiece(event: CustomEvent<{id: number}>) {
    data.pieces = data.pieces.filter(warmup => warmup.id != event.detail.id);
  }

  async function createNotes() {
    try {
      const res = await fetch(`/.netlify/functions/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const { id } = await res.json();
      //TODO: show a loading screen
      goto(`/view/${id}`);
    } catch (err) {
      console.log(err);
    }
  }

</script>

<div class="p-2 w-full top-0 fixed">
  <header class="w-full rounded p-2 md:px-4 bg-white border-carribean-current border-2 shadow-md bg-opacity-90 flex flex-wrap space-y-2 sm:space-y-0 items-center justify-between">
    <div>
      <h1 class="text-3xl pl-2 text-black font-bold">Lesson Notes</h1>
    </div>
    <div class="space-x-2 flex justify-end w-full sm:w-auto">
      <!-- TODO: add a modal to confirm clearing the whole form -->
      <button class="px-8 bg-wine text-xl rounded shadow shadow-ash-gray font-bold h-12 flex items-center text-white">Clear</button>
      <button class="px-8 bg-carribean-current shadow shadow-ash-gray text-xl rounded font-bold h-12 flex items-center text-white" on:click={createNotes}>Create</button>
    </div>
  </header>
</div>
<div class="h-24"></div>
<main class="max-w-6xl px-4 mx-auto">

  <section id="warmups" class="my-8 bg-white shadow-md shadow-ash-gray rounded p-4 flex flex-col border border-ash-gray">
    <h2 class="font-bold text-2xl underline underline-offset-4 decoration-2">Warmups and Scales</h2>
    <!-- TODO: make either the navbar or sections full width on mobile -->
    {#each data.warmups as warmup (warmup.id)}
      <PracticeItemForm itemType="warmup" bind:item={warmup} on:delete={deleteWarmup} />
    {/each}
    <div id="add-warmup" class="flex justify-end mt-2">
      <button on:click={addWarmup} class="px-4 bg-carribean-current py-2 font-bold text-lg rounded text-white shadow shadow-ash-gray">Add Warmup</button>
    </div>
  </section>

  <section id="exercises" class="my-8 bg-white shadow-md shadow-ash-gray rounded p-4 flex flex-col border border-ash-gray">
    <h2 class="font-bold text-2xl underline underline-offset-4 decoration-2">Etudes and Exercises</h2>
    <!-- TODO: make either the navbar or sections full width on mobile -->
    {#each data.exercises as exercise (exercise.id)}
      <PracticeItemForm itemType="exercises" bind:item={exercise} on:delete={deleteExercise} />
    {/each}
    <div id="add-warmup" class="flex justify-end mt-2">
      <button on:click={addExercise} class="px-4 bg-carribean-current py-2 font-bold text-lg rounded text-white shadow shadow-ash-gray">Add Exercise</button>
    </div>
  </section>

  <section id="pieces" class="my-8 bg-white shadow-md shadow-ash-gray rounded p-4 flex flex-col border border-ash-gray">
    <h2 class="font-bold text-2xl underline underline-offset-4 decoration-2">Pieces</h2>
    <!-- TODO: make either the navbar or sections full width on mobile -->
    {#each data.pieces as piece (piece.id)}
      <PracticeItemForm itemType="pieces" bind:item={piece} on:delete={deletePiece} />
    {/each}
    <div id="add-warmup" class="flex justify-end mt-2">
      <button on:click={addPiece} class="px-4 bg-carribean-current py-2 font-bold text-lg rounded text-white shadow shadow-ash-gray">Add Piece</button>
    </div>
  </section>

  <section id="general-notes" class="my-8 bg-white shadow-md shadow-ash-gray rounded p-4 flex flex-col border border-ash-gray">
    <h2 class="font-bold text-2xl underline underline-offset-4 decoration-2">General Notes</h2>
    <textarea
      bind:value={data.generalNotes}
      name='general-notes'
      id='general-notes'
      class="mt-2 rounded w-full px-2 py-1 border-2 border-gray-200 h-32 focus:border-cool-gray focus:outline-none"
    />
  </section>

</main>

