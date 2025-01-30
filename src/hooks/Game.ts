import { useCallback, useEffect, useRef, useState } from "react";
import type { GameProps } from "../components/Game";
import type { Quiz } from "../services/invoke";
import { fetchQuizs } from "../services/invoke";
import shuffle from "../utils/shuffle";

export function useGame(): GameProps {

    const quizs = useRef<Quiz[]>([])
    const loadQuizs = async () => {
        const quizs_ = await fetchQuizs()
        quizs.current = quizs_

        setCount(1)
        setMaxCount(quizs.current.length)
        setWords(shuffle(quizs.current[0].english.split(" ")))
        setJapanese(quizs.current[0].japanese)
        setInputed("")
        setInputedWords([])
    }

    useEffect(() => { loadQuizs() }, [])

    const [inputedWords, setInputedWords] = useState<string[]>([])
    const [japanese, setJapanese] = useState<string>("")
    const [count, setCount] = useState(1)
    const [maxCount, setMaxCount] = useState(0)
    const [words, setWords] = useState<string[]>([])
    const [inputed, setInputed] = useState("")

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === " ") {
            setInputed(prevInput => {
                setInputedWords(prevWords => {
                    return [...prevWords, prevInput]
                })
                return ""
            })
            return
        }

        if (e.key === "Backspace") {
            setInputed(prev => prev.slice(0, -1))
            return
        }

        if (e.key.length !== 1) {
            return
        }

        setInputed(prev => prev + e.key)
    }, [])

    // 参考URL: https://stackoverflow.com/questions/53033625/global-keyboards-events-on-react
    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    return {
        inputed,
        words,
        count,
        maxCount,
        japanese,
        inputedWords
    }
}