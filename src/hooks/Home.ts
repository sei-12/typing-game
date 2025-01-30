import { useNavigate } from "react-router-dom";
import type { HomeProps } from "../components/Home";

export function useHome(): HomeProps {
    const navigate = useNavigate()

    const onClickStart = () => {
        navigate("/game")
    }
    const onClickAddQuiz = () => {

    }

    return {
        onClickAddQuiz,
        onClickStart,
    }
}