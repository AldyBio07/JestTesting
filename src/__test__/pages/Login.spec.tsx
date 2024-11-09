import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "@/pages/auth/login";

describe("Login Component", () => {
  it("renders login form", () => {
    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("submits the form with valid data", () => {
    render(<Login />);
    
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));


  });

  it("shows error on invalid data", () => {
    render(<Login />);
    
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    const errorMessage = screen.getByText(/please enter valid credentials/i); 
    expect(errorMessage).toBeInTheDocument();
  });
});