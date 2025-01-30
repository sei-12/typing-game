import { Game } from "../components/Game";
import { useGame } from "../hooks/Game";

export function GamePage(){
    const hook = useGame()
    return (
        <Game {...hook}></Game>
    )
}