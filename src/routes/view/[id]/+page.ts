import { error } from '@sveltejs/kit';
import { NotesData } from '$lib/notesData';
import type { PageLoad } from './$types';
import { PUBLIC_ENDPOINT } from '$env/static/public';

export const load = (async ({ params, fetch }) => {
  if (!params.id) {
    throw error(404, "Could not find matching notes");
  }

  let notesData: NotesData;
  try {
    // This is a hack for development. relative url function calls don't work here
    // in development, but should work in production.
    const response = await fetch(`${PUBLIC_ENDPOINT}/api/view?id=${params.id}`);
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
    throw error(500, 'Internal server error' + err)
  }
  return {
    ...notesData
  }
}) satisfies PageLoad;

export const config = {
  isr: {
    // Keep for a month
    expiration: 60 * 60 * 24 * 30,
  }
}
