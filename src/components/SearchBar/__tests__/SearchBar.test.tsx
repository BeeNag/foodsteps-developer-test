import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../index";

const mockPosts = [
  { userId: 1, id: 1, title: "First Post", body: "Body of first post" },
  { userId: 1, id: 2, title: "Second Post", body: "Body of second post" },
  { userId: 1, id: 3, title: "Another Post", body: "Body of another post" },
];

describe("SearchBar Component", () => {
  test("filters posts based on the search query", () => {
    const handleSearch = jest.fn();
    render(<SearchBar posts={mockPosts} onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText(
      "Search posts"
    ) as HTMLInputElement;

    // Simulate typing in the input
    fireEvent.change(input, { target: { value: "First" } });

    // Ensure the filtered posts contain only the expected post
    expect(handleSearch).toHaveBeenCalledWith([
      { userId: 1, id: 1, title: "First Post", body: "Body of first post" },
    ]);
  });

  test("returns all posts when the search query is cleared", () => {
    const handleSearch = jest.fn();
    render(<SearchBar posts={mockPosts} onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText(
      "Search posts"
    ) as HTMLInputElement;

    // Simulate typing in the input
    fireEvent.change(input, { target: { value: "First" } });

    // Simulate clearing the input
    const clearButton = screen.getByRole("button");
    fireEvent.click(clearButton);

    // Ensure all posts are returned when cleared
    expect(handleSearch).toHaveBeenCalledWith(mockPosts);
  });

  test('shows "No posts found" when no posts match the query', () => {
    const handleSearch = jest.fn();
    render(<SearchBar posts={mockPosts} onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText(
      "Search posts"
    ) as HTMLInputElement;

    // Simulate typing a query that returns no results
    fireEvent.change(input, { target: { value: "Nonexistent Post" } });

    // Ensure the filtered posts array is empty as if the array is empty then "No posts found" will be shown
    expect(handleSearch).toHaveBeenCalledWith([]);
  });
});
