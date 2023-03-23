import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'
import AWS from 'aws-sdk';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const uuid = require('uuid');

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const access_key_id = process.env.ACCESS_KEY_ID;
  if (!access_key_id) {
    console.error("ACCESS_KEY_ID must be set in environment");
    return {
      statusCode: 500,
      body: "Internal server error",
    };
  }
  const secret_access_key = process.env.SECRET_ACCESS_KEY;
  if (!secret_access_key) {
    console.error("SECRET_ACCESS_KEY must be set in environment");
    return {
      statusCode: 500,
      body: "Internal server error",
    };
  }

  if (!event.body || !bodyIsValid(event.body)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Invalid data."
      })
    }
  }

  const s3 = new AWS.S3({
    endpoint: 's3.us-west-000.backblazeb2.com',
    region: 'us-west-000',
    credentials: new AWS.Credentials(access_key_id, secret_access_key)
  })

  const fileId = uuid.v4();


  s3.putObject({
    Body: event.body,
    Bucket: "student-lesson-notes",
    Key: `${fileId}.json`,
  }, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data)
    }
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      id: fileId,
    }),
  }
}

function bodyIsValid(body: string): boolean {
  return body.includes(`"warmups":`)
    && body.includes(`"exercises":`)
    && body.includes(`"pieces":`)
    && body.includes(`"generalNotes":`)
}
