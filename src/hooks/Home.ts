import { useNavigate } from "react-router-dom";
import type { HomeProps } from "../components/Home";
import { openQuizFile } from "../services/invoke";

export function useHome(): HomeProps {
    const navigate = useNavigate()

    const onClickStart = () => {
        navigate("/game")
    }
    const onClickAddQuiz = () => {
        openQuizFile()
    }

    return {
        onClickAddQuiz,
        onClickStart,
    }
}