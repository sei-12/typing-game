import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { GamePage } from "./pages/Game";
import { Box } from "@mui/material";

function App() {
    return (
        <Box
            sx={{
                top: 0,
                left: 0,
                position: "absolute",
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/game" element={<GamePage></GamePage>}></Route>
                    <Route path="/" element={<HomePage></HomePage>}></Route>
                </Routes>
            </BrowserRouter>
        </Box>
    );
}

export default App;
