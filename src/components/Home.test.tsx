import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { Home, type HomeProps } from "./Home";

export function buildHomeProps(): HomeProps {
    return {
        onClickAddQuiz: vi.fn(),
        onClickStart: vi.fn(),
    };
}

describe("Home", () => {
    test("test1", async () => {
        const props = buildHomeProps();
        render(<Home {...props}></Home>);
        const user = userEvent.setup();

        const addButton = screen.getByText("問題を追加");
        const startButton = screen.getByText("開始");

        expect(props.onClickAddQuiz).toBeCalledTimes(0);
        await user.click(addButton);
        expect(props.onClickAddQuiz).toBeCalledTimes(1);

        expect(props.onClickStart).toBeCalledTimes(0);
        await user.click(startButton);
        expect(props.onClickStart).toBeCalledTimes(1);
    });
});
