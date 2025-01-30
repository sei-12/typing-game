import { Button } from "@mui/material";

export type HomeProps = {
    onClickStart: () => void;
    onClickAddQuiz: () => void;
};


export function Home(p: HomeProps) {
    return (
        <>
            <Button onClick={p.onClickAddQuiz}>問題を追加</Button>
            <Button onClick={p.onClickStart}>開始</Button>
        </>
    );
}
