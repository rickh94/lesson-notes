import { error } from '@sveltejs/kit';
import { NotesData } from '$lib/notesData';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
  if (!params.id) {
    throw error(404, "Could not find matching notes");
  }

  let notesData: NotesData;
  try {
    const response = await fetch(`http://localhost:3000/api/view?id=${params.id}`);
    const data = await response.json();
    if (!('warmups' in data)
      || !('exercises' in data)
      || !('pieces' in data)
      || !('generalNotes' in data)
    ) {
      throw error(404, "Could not find matching notes");
    }
    notesData = new NotesData(data.warmups, data.exercises, data.pieces, data.generalNotes);
  } catch (err: any) {
    console.log(err);
    throw error(500, 'Internal server error')
  }
  return {
    ...notesData
  }
}) satisfies PageLoad;
