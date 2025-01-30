import { useEffect, useRef, useState } from "react";
import type { EnglishWords, GameProps } from "../components/Game";
import type { Quiz } from "../services/invoke";
import { fetchQuizs } from "../services/invoke";
import shuffle from "../utils/shuffle";
import { useHotkeys } from "react-hotkeys-hook";

export function useGame(): GameProps {

    const quizs = useRef<Quiz[]>([])
    const loadQuizs = async () => {
        const quizs_ = await fetchQuizs()
        quizs.current = quizs_

        setCount(1)
        setMaxCount(quizs.current.length)
        setWords(shuffle(quizs.current[0].english.split(" ").map(w => ({ content: w, inputed: false }))))
        setJapanese(quizs.current[0].japanese)
        // setInputed("")
    }

    useEffect(() => { loadQuizs() }, [])

    const [japanese, setJapanese] = useState<string>("")
    const [count, setCount] = useState(1)
    const [maxCount, setMaxCount] = useState(0)
    const [words, setWords] = useState<EnglishWords[]>([])
    const [inputed, setInputed] = useState("")
    const inputBox = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const includeWords = new Set(inputed.split(" "));
        setWords(prev => {
            return prev.map(p => ({
                content: p.content,
                inputed: includeWords.has(p.content)
            }))
        })
    }, [inputed])

    useHotkeys("ctrl+w", () => {
        setInputed(prev => {
            let targetSpace = prev.lastIndexOf(" ")
            if (targetSpace === prev.length - 1) {
                targetSpace = prev.lastIndexOf(" ", prev.length - 2)
            }
            const newVal = prev.slice(0, targetSpace + 1)
            if (inputBox.current !== null) {
                inputBox.current.value = newVal
            }
            return newVal
        })

    }, {
        enableOnFormTags: true,
        enableOnContentEditable: true
    }, [])

    return {
        words,
        count,
        maxCount,
        japanese,
        onChangeInputBox: setInputed,
        inputBox,
    }
}