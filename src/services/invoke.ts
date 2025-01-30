export type Quiz = {
    japanese: string
    english: string
    explanation: string
}

export async function fetchQuizs(): Promise<Quiz[]> {
    // TODO
    return [
        {
            japanese: "私は昨晩、とても悲しかったです",
            english: "I was very sad last night",
            explanation: ""
        },
        {
            japanese: "私はその本が好きではありません。",
            english: "I do not like the book",
            explanation: ""
        },
        {
            japanese: "私達はゴルフをしません",
            english: "We do not play golf",
            explanation: ""
        },
        {
            japanese: "彼らは肉を食べません",
            english: "They don't eat meat",
            explanation: ""
        },
        {
            japanese: "私たちはコーヒーを飲みません",
            english: "We don't drink coffee",
            explanation: ""
        }
    ]

}