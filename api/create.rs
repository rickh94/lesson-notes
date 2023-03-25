use lesson_notes_functions::{setup_s3, ApiError, NotesData};
use rusoto_s3::{PutObjectRequest, S3};
use serde_json::json;
use uuid::Uuid;
use vercel_runtime::{
    http::{bad_request, internal_server_error},
    run, Body, Error, Request, Response, StatusCode,
};

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

pub async fn handler(req: Request) -> Result<Response<Body>, Error> {
    let body_bytes = match req.body() {
        Body::Text(s) => s.as_bytes().to_vec(),
        Body::Binary(b) => b.to_vec(),
        Body::Empty => Vec::new(),
    };

    // Deserialize the JSON data into a MyData struct
    let notes_data: NotesData = match serde_json::from_slice(&body_bytes) {
        Ok(data) => data,
        Err(e) => {
            eprintln!("Could not deserialize data: {}", e);
            return bad_request(ApiError {
                message: "Invalid data.",
            });
        }
    };

    let file_id = Uuid::new_v4().to_string();

    let s3_client = match setup_s3() {
        Ok(c) => c,
        Err(e) => {
            eprintln!("Could not create request dispatcher: {}", e);
            return internal_server_error(ApiError {
                message: "Something went wrong.",
            });
        }
    };

    let put_object_result = s3_client
        .put_object(PutObjectRequest {
            bucket: "student-lesson-notes".into(),
            body: Some(json!(notes_data).to_string().as_bytes().to_vec().into()),
            key: format!("{}.json", file_id),
            ..Default::default()
        })
        .await;

    if put_object_result.is_ok() {
        Ok(Response::builder()
            .status(StatusCode::OK)
            .header("Content-Type", "application/json")
            .body(json!({ "id": file_id }).to_string().into())?)
    } else {
        internal_server_error(ApiError {
            message: "Could not upload file",
        })
    }
}
