import { error } from '@sveltejs/kit';
import { NotesData } from '$lib/notesData';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
  if (!params.id) {
    throw error(404, "Could not find matching notes");
  }

  let notesData: NotesData;
  try {
    const response = await fetch(`https://f000.backblazeb2.com/file/student-lesson-notes/${params.id}.json`);
    const data = await response.json();
    if (!('warmups' in data)
      || !('exercises' in data)
      || !('pieces' in data)
      || !('generalNotes' in data)
    ) {
      throw error(404, "Could not find matching notes");
    }
    notesData = new NotesData(data.warmups, data.exercises, data.pieces, data.generalNotes, new Date(data.date));
  } catch (err: unknown) {
    console.log(err);
    throw error(500, 'Internal server error: ' + err)
  }
  return {
    ...notesData
  }
}) satisfies PageLoad;

