
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "@/pages/auth/Modal"; 

describe("Modal Component", () => {
  it("renders the modal when open", () => {
    render(<Modal isOpen={true} onClose={() => { } } message={""} />); 

    const modalContent = screen.getByText(/modal content/i); 
    expect(modalContent).toBeInTheDocument();
  });

  it("does not render the modal when closed", () => {
    render(<Modal isOpen={false} onClose={() => { } } message={""} />);

    const modalContent = screen.queryByText(/modal content/i); 
    expect(modalContent).not.toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    const handleClose = jest.fn();
    render(<Modal isOpen={true} onClose={handleClose} message={""} />);

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalled();
  });
});