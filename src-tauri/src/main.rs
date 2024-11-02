#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use tauri::{Manager, Window};
use std::path::PathBuf;

#[derive(Debug, Serialize, Deserialize)]
struct AppConfig {
    llm_provider: String,
    api_key: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct WindowSettings {
    x: f64,
    y: f64,
    width: f64,
    height: f64,
}

#[tauri::command]
async fn save_window_position(
    window: Window,
    x: f64,
    y: f64,
    width: f64,
    height: f64,
) -> Result<(), String> {
    let settings = WindowSettings {
        x,
        y,
        width,
        height,
    };
    
    let app_handle = window.app_handle();
    let config_path = app_handle
        .path()
        .app_config_dir()
        .map_err(|e| e.to_string())?;
    
    std::fs::create_dir_all(&config_path).map_err(|e| e.to_string())?;
    let settings_file = config_path.join("window.json");
    let settings_json = serde_json::to_string(&settings).map_err(|e| e.to_string())?;
    std::fs::write(settings_file, settings_json).map_err(|e| e.to_string())?;
    
    Ok(())
}

#[tauri::command]
async fn get_window_position() -> Result<WindowSettings, String> {
    Ok(WindowSettings {
        x: 100.0,
        y: 100.0,
        width: 400.0,
        height: 600.0,
    })
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            save_window_position,
            get_window_position,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
