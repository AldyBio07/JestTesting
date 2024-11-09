import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import TodoDetail from '@/pages/todos/[id]';


jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('cookies-next', () => ({
  getCookie: jest.fn(),
}));

// Sample
const mockTodo = {
  id: 1,
  name: ' Pizza',
  description: 'Enak Betullah',
  price: 150,
  imageUrl: 'https://example.com/pizza.jpg',
  ingredients: ['Cheese', 'Tomato Sauce', 'Pepperoni', 'Basil'],
  rating: 4.5,
  totalLikes: 250,
};

describe('TodoDetail Component', () => {
  const mockRouterBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      back: mockRouterBack,
    });
    (getCookie as jest.Mock).mockReturnValue('mock-token');
  });

  it('renders todo details correctly', () => {
    render(<TodoDetail todo={mockTodo} />);

    expect(screen.getByText(mockTodo.name)).toBeInTheDocument();
    expect(screen.getByText(mockTodo.description)).toBeInTheDocument();
    expect(screen.getByText(`Rp.${mockTodo.price}`)).toBeInTheDocument();

    mockTodo.ingredients.forEach(ingredient => {
      expect(screen.getByText(ingredient)).toBeInTheDocument();
    });

    expect(screen.getByText(`⭐ ${mockTodo.rating}`)).toBeInTheDocument();
    expect(screen.getByText(`Likes: ${mockTodo.totalLikes}`)).toBeInTheDocument();
  });

  it('renders todo image correctly', () => {
    render(<TodoDetail todo={mockTodo} />);

    const image = screen.getByAltText(mockTodo.name) as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(mockTodo.imageUrl);
  });

  it('handles back button click', () => {
    render(<TodoDetail todo={mockTodo} />);

    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);

    expect(mockRouterBack).toHaveBeenCalledTimes(1);
  });

  it('applies correct styling classes', () => {
    render(<TodoDetail todo={mockTodo} />);

    const mainContainer = screen.getByText(mockTodo.name).closest('div');
    expect(mainContainer).toHaveClass('bg-gray-800');
    expect(mainContainer).toHaveClass('rounded-lg');
    expect(mainContainer).toHaveClass('shadow-lg');


    const image = screen.getByAltText(mockTodo.name);
    expect(image).toHaveClass('object-cover');
    expect(image).toHaveClass('w-full');
    expect(image).toHaveClass('h-64');
    expect(image).toHaveClass('rounded-md');
  });

  it('handles long descriptions and ingredients', () => {
    const longTodo = {
      ...mockTodo,
      description: 'A very long description that tests how the component handles lengthy text...',
      ingredients: [
        'Ingredient 1', 
        'Ingredient 2', 
        'Ingredient 3', 
        'Ingredient 4', 
        'Ingredient 5'
      ],
    };

    render(<TodoDetail todo={longTodo} />);
    longTodo.ingredients.forEach(ingredient => {
      expect(screen.getByText(ingredient)).toBeInTheDocument();
    });
    expect(screen.getByText(longTodo.description)).toBeInTheDocument();
  });
});