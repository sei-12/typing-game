import { useCallback, useEffect, useRef, useState } from "react";
import type { EnglishWords, GameProps } from "../components/Game";
import type { Quiz } from "../services/invoke";
import { fetchQuizs } from "../services/invoke";
import shuffle from "../utils/shuffle";
import { useHotkeys } from "react-hotkeys-hook";
import { useNavigate } from "react-router-dom";


function useTodoRenameBar() {
    const todoRenameBar = useRef<HTMLElement>(null)
    const [gameover, setGameover] = useState(false)
    const intervalId = useRef(0)
    
    const start = () => {
        clearInterval(intervalId.current)
        const timeoutMs = 10 * 1000
        let time = 0;
        const fps = 1000 / 60
        intervalId.current = setInterval(() => {
            if (todoRenameBar.current === null) { return }
            time += fps
            if (time > timeoutMs) {
                setGameover(true)                
                return
            }else{
                const w = 100 - time / timeoutMs * 100;
                todoRenameBar.current.style.width = w + "%"
                let color = ""
                if ( w > 50 ){
                    color = "lightgreen"
                }else if ( w > 20 ) {
                    color = "orange"
                }else{
                    color = "red"
                }
                todoRenameBar.current.style.borderColor = color
            }
        }, fps)
    }

    return {
        todoRenameBar,
        gameover,
        start
    }
}


export function useGame(): GameProps {
    const navigate = useNavigate()

    const quizs = useRef<Quiz[]>()
    const currentQuizIndex = useRef<number>(-1)

    const loadQuizs = async () => {
        const quizs_ = await fetchQuizs()
        quizs.current = quizs_
        currentQuizIndex.current = 0
        setMaxCount(quizs.current.length)
        startQuiz(0)
    }

    useEffect(() => { loadQuizs() }, [])

    const [japanese, setJapanese] = useState<string>("")
    const [maxCount, setMaxCount] = useState(0)
    const [words, setWords] = useState<EnglishWords[]>([])
    const [count, setCount] = useState(0)
    const [inputed, setInputed] = useState("")
    const inputBox = useRef<HTMLInputElement>(null)
    const todoRenameBar = useTodoRenameBar()


    const startQuiz = useCallback((c: number) => {
        if (quizs.current === undefined) { return }
        if (inputBox.current === null) { return }

        inputBox.current.focus()
        inputBox.current.value = ""
        currentQuizIndex.current = c

        const words = quizs.current[c].english
            .split(" ")
            .map(w => ({ content: w, inputed: false }))
        const shuffledWords = shuffle(words)

        setCount(currentQuizIndex.current + 1)
        setWords(shuffledWords)
        setJapanese(quizs.current[c].japanese)
        todoRenameBar.start()
    }, [])

    useEffect(() => {
        if (quizs.current === undefined) { return }
        if (currentQuizIndex.current === -1) { return }

        if (inputed === quizs.current[currentQuizIndex.current].english) {
            if (currentQuizIndex.current === maxCount - 1) {
                navigate("/")
                return
            }

            startQuiz(currentQuizIndex.current + 1)
            return
        }

        setWords(prev => {
            const words = inputed.split(" ");
            const has = (w: string) => {
                const result = words.includes(w)
                if (result) {
                    const index = words.findIndex(word => w == word)
                    words.splice(index, 1)
                }
                return result
            }

            return prev.map(p => ({
                content: p.content,
                inputed: has(p.content)
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
        todoRenameBar: todoRenameBar.todoRenameBar,
    }
}