import { Box, Typography } from "@mui/material";
import { DisablePreventNavigation } from "../utils/DisablePreventNavigation";

export type GameProps = {
    inputedWords: string[];
    japanese: string;
    count: number;
    maxCount: number;
    words: string[];
    inputed: string;
};

export function Game(p: GameProps) {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                textAlign: "center",
            }}
        >
            <DisablePreventNavigation></DisablePreventNavigation>

            <Box
                sx={{
                    border: "solid 2px black",
                    marginBlock: "5%",
                    marginInline: "10%",
                    width: 0.8,
                    height: 80,
                    position: "relative",
                    display: "flex",
                }}
            >
                <Typography
                    sx={{
                        margin: "auto",
                        fontSize: "x-large",
                    }}
                >
                    {p.japanese}
                </Typography>
                <Typography
                    sx={{
                        position: "absolute",
                        bottom: 2,
                        right: 4,
                    }}
                >
                    {p.count}/{p.maxCount}
                </Typography>
            </Box>

            <Box>
                {p.words.map((w, i) => {
                    return <Typography key={i}>{w}</Typography>;
                })}
            </Box>
            <Box>
                {p.inputedWords.map((w, i) => {
                    return <Typography key={i}>{w}</Typography>;
                })}
            </Box>

            <Typography>{p.inputed}</Typography>
        </Box>
    );
}
