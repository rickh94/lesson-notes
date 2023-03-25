use std::collections::HashMap;
use tokio::io::AsyncReadExt;
use url::Url;

use lesson_notes_functions::{setup_s3, ApiError, NotesData};
use rusoto_core::RusotoError;
use rusoto_s3::{GetObjectError, GetObjectRequest, S3};
use serde_json::json;
use vercel_runtime::{
    http::{internal_server_error, not_found},
    run, Body, Error, Request, Response, StatusCode,
};

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

pub async fn handler(req: Request) -> Result<Response<Body>, Error> {
    let parsed_url = match Url::parse(&req.uri().to_string()) {
        Ok(url) => url,
        Err(err) => {
            println!("Could not parse url: {}", err);
            return internal_server_error(ApiError {
                message: "Something went wrong.",
            });
        }
    };
    let hash_query: HashMap<String, String> = parsed_url.query_pairs().into_owned().collect();

    let file_id = match hash_query.get("id") {
        Some(id) => id,
        None => {
            return not_found(ApiError {
                message: "Could not find matching notes",
            });
        }
    };

    let s3_client = match setup_s3() {
        Ok(c) => c,
        Err(e) => {
            eprintln!("Could not create request dispatcher: {}", e);
            return internal_server_error(ApiError {
                message: "Something went wrong.",
            });
        }
    };

    let get_object_result = match s3_client
        .get_object(GetObjectRequest {
            bucket: "student-lesson-notes".into(),
            key: format!("{}.json", file_id),
            ..Default::default()
        })
        .await
    {
        Ok(res) => res,
        Err(RusotoError::Service(GetObjectError::NoSuchKey(_))) => {
            return not_found(ApiError {
                message: "Could not find matching notes",
            });
        }
        Err(err) => {
            eprintln!("Something went wrong: {}", err);
            return internal_server_error(ApiError {
                message: "Could not get notes",
            });
        }
    };

    let body = match get_object_result.body {
        Some(b) => b,
        None => {
            return not_found(ApiError {
                message: "Could not find matching notes",
            });
        }
    };

    let mut buf = String::with_capacity(64);

    if let Err(err) = body.into_async_read().read_to_string(&mut buf).await {
        eprintln!("Could not read s3 data: {}", err);
        return internal_server_error(ApiError {
            message: "Something went wrong.",
        });
    };

    let notes_data: NotesData = match serde_json::from_str(&buf) {
        Ok(data) => data,
        Err(err) => {
            eprintln!("Could not deserialize data from object: {}", err);
            return internal_server_error(ApiError {
                message: "Could not get data",
            });
        }
    };

    Ok(Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/json")
        .body(json!(notes_data).to_string().into())?)
}
