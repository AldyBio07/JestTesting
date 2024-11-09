import Input from "@/components/UI/input";
import { render, screen } from "@testing-library/react";

describe("Input Component", () => {
    it("render input component", () => { 
        const { container } = render(<Input type="text" value=""/>);
        expect(container).toMatchSnapshot();
    });

    it("render textarea component", () => { 
        const { container } = render(<Input type="textarea" value=""/>);
        expect(container).toMatchSnapshot();
    });
});