import React from "react";
import { render, screen } from "@testing-library/react";
import Todos from "@/pages/todos";


const mockTodos = [
  { id: 1, title: "Learn React", completed: false },
  { id: 2, title: "Build a Todo App", completed: true },
];



describe("Todos Component", () => {
  it("renders todos list", () => {
    render(<Todos todos={mockTodos} />);

    expect(screen.getByText(/learn react/i)).toBeInTheDocument();
    expect(screen.getByText(/build a todo app/i)).toBeInTheDocument();
  });

  it("displays completed status", () => {
    render(<Todos todos={mockTodos} />);

    const completedTodo = screen.getByText(/build a todo app/i);
    expect(completedTodo).toHaveTextContent("Done");
  });
});