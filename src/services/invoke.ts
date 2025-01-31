import { invoke } from "@tauri-apps/api/core"

export type Quiz = {
    japanese: string
    english: string
    explanation: string
}

export async function fetchQuizs(): Promise<Quiz[]> {
    const quizs = await invoke<Quiz[]>("fetch_quizs")
    return quizs
}