use std::fs::{create_dir_all, read_to_string};

use rand::seq::SliceRandom;
use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Manager, State};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn quiz_data_file_path(app_handle: &AppHandle) -> String {
    let app_path = app_handle
        .path()
        .app_data_dir()
        .expect("No App data path was found!");

    let _ = create_dir_all(&app_path);
    format!("{}/quiz.json", app_path.to_str().unwrap())
}

#[derive(Serialize, Deserialize)]
struct Quiz {
    japanese: String,
    english: String,
    explanation: String,
}

#[tauri::command]
fn fetch_quizs(app: State<AppHandle>) -> Result<Vec<Quiz>, String> {
    let file_path = quiz_data_file_path(app.inner());

    let Ok(content) = read_to_string(file_path) else {
        return Err("ファイルの読み込みに失敗しました".to_string());
    };

    let Ok(mut quizs) = serde_json::from_str::<Vec<Quiz>>(&content) else {
        return Err("ファイルの形式が不正です".to_string());
    };

    let mut rng = rand::thread_rng();
    quizs.shuffle(&mut rng);

    let quizs = quizs.into_iter().take(10).collect();

    Ok(quizs)
}

#[tauri::command]
fn open_quiz_file(app: State<AppHandle>) -> Result<(), String> {
    let file_path = quiz_data_file_path(app.inner());
    if opener::open(&file_path).is_err() {
        return Err(format!("ファイルを開けませんでした。: {}", &file_path));
    };

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, fetch_quizs, open_quiz_file])
        .setup(|app| {
            let handle = app.app_handle().clone();
            app.manage(handle);

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
