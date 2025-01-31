import { Box, styled, TextField, Typography } from "@mui/material";
import { DisablePreventNavigation } from "../utils/DisablePreventNavigation";

export type EnglishWords = {
    content: string;
    inputed: boolean;
};

export type GameProps = {
    japanese: string;
    count: number;
    maxCount: number;
    words: EnglishWords[];
    inputBox: React.RefObject<HTMLInputElement>;
    todoRenameBar: React.RefObject<HTMLElement>;
    onChangeInputBox: (newVal: string) => void;
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
                    marginTop: "5%",
                    marginInline: "10%",
                    width: 0.8,
                    height: 220,
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

            <Box
                sx={{
                    border: "solid 1px black",
                    marginTop: "3%",
                    width: "90%",
                    marginInline: "5%",
                }}
            >
                {p.words.map((w, i) => {
                    return (
                        <Typography
                            sx={{
                                color: w.inputed ? "gray" : "black",
                                display: "inline-block",
                                margin: 1,
                            }}
                            key={i}
                        >
                            {w.content}
                        </Typography>
                    );
                })}
            </Box>

            <TextField
                sx={{
                    marginTop: "3%",
                    width: "70%",
                    marginInline: "5%",
                    border: "none",
                    fieldset: {
                        border: "none",
                    },
                }}
                variant="outlined"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                inputRef={p.inputBox}
                onBlur={() => {
                    setTimeout(() => {
                        p.inputBox.current!.focus();
                    }, 10);
                }}
                onChange={(e) => p.onChangeInputBox(e.target.value)}
            ></TextField>
            <Box
                sx={{
                    marginLeft: "15%",
                    width: "70%",
                }}
            >
                <Box
                    ref={p.todoRenameBar}
                    sx={{
                        border: "solid 1px red",
                    }}
                ></Box>
            </Box>
        </Box>
    );
}
