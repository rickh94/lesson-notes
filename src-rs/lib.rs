use std::env;

use rusoto_core::{request::TlsError, Region};
use rusoto_s3::S3Client;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
#[serde(rename_all(serialize = "camelCase", deserialize = "snake_case"))]
pub struct PracticeItem {
    pub title: String,
    pub resources: Vec<String>,
    pub notes: String,
    pub label: String,
    pub id: f64,
}

#[derive(Deserialize, Serialize)]
#[serde(rename_all(serialize = "camelCase", deserialize = "camelCase"))]
pub struct NotesData {
    pub warmups: Vec<PracticeItem>,
    pub exercises: Vec<PracticeItem>,
    pub pieces: Vec<PracticeItem>,
    pub general_notes: String,
    pub date: String,
}

#[derive(Serialize)]
pub struct ApiError<'a> {
    pub message: &'a str,
}

pub fn setup_s3() -> Result<S3Client, TlsError> {
    let access_key =
        env::var("ACCESS_KEY_ID").expect("ACCESS_KEY_ID must be set in the environment");
    let secret_key =
        env::var("SECRET_ACCESS_KEY").expect("SECRET_ACCESS_KEY must be set in the environment");

    let request_dispatcher = rusoto_core::request::HttpClient::new()?;
    Ok(S3Client::new_with(
        request_dispatcher,
        rusoto_credential::StaticProvider::new_minimal(
            access_key.to_string(),
            secret_key.to_string(),
        ),
        Region::Custom {
            name: "eu-west-0000".to_owned(),
            endpoint: "s3.us-west-000.backblazeb2.com".to_owned(),
        },
    ))
}
