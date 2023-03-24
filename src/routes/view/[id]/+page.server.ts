import { error } from '@sveltejs/kit';
import { NotesData } from '$lib/notesData';
import type { PageServerLoad } from './$types';
import AWS from 'aws-sdk';

export const load = (async ({ params }) => {
  if (!params.id) {
    throw error(404, "Could not find matching notes");
  }
  console.log(params.id);

  const access_key_id = process.env.ACCESS_KEY_ID;
  if (!access_key_id) {
    console.error("ACCESS_KEY_ID must be set in environment");
    throw error(500, 'Internal server error');
  }
  const secret_access_key = process.env.SECRET_ACCESS_KEY;
  if (!secret_access_key) {
    console.error("SECRET_ACCESS_KEY must be set in environment");
    throw error(500, 'Internal server error');
  }

  const s3 = new AWS.S3({
    endpoint: 's3.us-west-000.backblazeb2.com',
    region: 'us-west-000',
    credentials: new AWS.Credentials(access_key_id, secret_access_key)
  });


  let notesData: NotesData;
  try {
    const result = await s3.getObject({
      Bucket: "student-lesson-notes",
      Key: `${params.id}.json`
    }).promise();
    if (!result.Body) {
      throw error(404, "Could not find matching notes");
    }
    const body = JSON.parse(result.Body.toString());
    if (!('warmups' in body)
      || !('exercises' in body)
      || !('pieces' in body)
      || !('generalNotes' in body)
    ) {
      throw error(404, "Could not find matching notes");
    }
    notesData = new NotesData(body.warmups, body.exercises, body.pieces, body.generalNotes);
  } catch (err: any) {
    if ('statusCode' in err && err.statusCode === 404) {
      throw error(404, "Could not find matching notes")
    }
    console.log(err);
    throw error(500, 'Internal server error')
  }
  return {
    ...notesData
  }
}) satisfies PageServerLoad;
