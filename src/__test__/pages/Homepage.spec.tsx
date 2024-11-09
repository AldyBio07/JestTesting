import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import { getCookie, deleteCookie } from "cookies-next";
import Homepage from "@/pages/homepage";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("cookies-next", () => ({
  getCookie: jest.fn(),
  deleteCookie: jest.fn(),
}));

jest.mock("react-slick", () => {
  return function MockSlider({ children }: { children: React.ReactNode }) {
    return <div data-testid="mock-slider">{children}</div>;
  };
});


const mockFoods = [
  {
    id: 1,
    name: "Pizza",
    description: "Delicious cheese pizza",
    price: 10,
    imageUrl: "https://example.com/pizza.jpg",
  },
  {
    id: 2,
    name: "Burger",
    description: "Juicy beef burger",
    price: 15,
    imageUrl: "https://example.com/burger.jpg",
  },
];

describe("Homepage", () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });

    (getCookie as jest.Mock).mockReturnValue("mock-token");
  });

  it("renders homepage with food items", () => {
    render(<Homepage foods={mockFoods} />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();

    mockFoods.forEach((food) => {
      expect(screen.getByText(food.name)).toBeInTheDocument();
      expect(screen.getByText(food.description)).toBeInTheDocument();
      expect(screen.getByText(`$${food.price}`)).toBeInTheDocument();
    });
  });

  it("renders featured dishes section", () => {
    render(<Homepage foods={mockFoods} />);
    expect(screen.getByText("Featured Dishes")).toBeInTheDocument();
  });

  it("renders testimonials section", () => {
    render(<Homepage foods={mockFoods} />);
    expect(screen.getByText("What Our Customers Say")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Best pizza I've ever had! Highly recommend to everyone."
      )
    ).toBeInTheDocument();
  });

  it("handles logout functionality", () => {
    render(<Homepage foods={mockFoods} />);
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    expect(deleteCookie).toHaveBeenCalledWith("token");
    expect(mockRouterPush).toHaveBeenCalledWith("/auth/login");
  });

  it("navigates to menu page", () => {
    render(<Homepage foods={mockFoods} />);
    const viewMenuButton = screen.getByText("View Menu");
    fireEvent.click(viewMenuButton);
    expect(mockRouterPush).toHaveBeenCalledWith("/todos");
  });

  it("renders slider with food images", () => {
    render(<Homepage foods={mockFoods} />);
    mockFoods.forEach((food) => {
      const images = screen.getAllByAltText(food.name);
      expect(images.length).toBeGreaterThan(0);
    });
  });
});