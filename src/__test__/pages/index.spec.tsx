import Home from "@/pages";
import { render, screen } from "@testing-library/react";

describe("input Component", () => {
    it("render input text", () => {
        const { container } = render(Home());
        expect(screen.getByText("Home")).toBeInTheDocument();
    });
})