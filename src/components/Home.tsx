import { Box, Button, styled } from "@mui/material";

export type HomeProps = {
    onClickStart: () => void;
    onClickAddQuiz: () => void;
};

export function Home(p: HomeProps) {
    const Btn = styled(Button)({
        width: 120,
    });

    return (
        <Box
            sx={{
                width: 1,
                height: 1,
                textAlign: "center",
            }}
        >
            <Btn onClick={p.onClickAddQuiz}>問題を追加</Btn>
            <Btn onClick={p.onClickStart}>開始</Btn>
        </Box>
    );
}
