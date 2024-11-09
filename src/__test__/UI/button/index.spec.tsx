import Button from "@/components/UI/button";
import { fireEvent, render } from "@testing-library/react";

describe("Button Component", () => {
    it("render button component", () => {
        const { container } = render(<Button onClick={() => {}}>test</Button>);
        expect(container).toMatchSnapshot();
    });
    it("render button component", () => {
        const clickFunction = jest.fn();
        const { getByText } = render(<Button onClick={clickFunction} children=""/>);
        fireEvent.click(getByText("button"));
        expect(clickFunction ).toMatchSnapshot();
    });
});