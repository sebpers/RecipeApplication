import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest"; // for assertions and mocking
import FilterRecipeListComponent from "../../../components/filter/FilterRecipeListComponent";
import RecipeListInformation from "../../../types/RecipeListInformation";

const date = new Date();
const mockRecipes: RecipeListInformation[] = [
  {
    id: 1,
    title: "Recipe 1",
    author: "Author A",
    createdAt: date,
    updatedAt: date,
  },
  {
    id: 2,
    title: "Recipe 2",
    author: "Author B",
    createdAt: date,
    updatedAt: date,
  },
  {
    id: 3,
    title: "Recipe 3",
    author: "Author C",
    createdAt: date,
    updatedAt: date,
  },
];

describe("FilterRecipeListComponent", () => {
  it("renders the input field", () => {
    render(
      <FilterRecipeListComponent
        recipes={mockRecipes}
        setFilteredRecipes={vi.fn()}
      />
    );

    // Check if the input field is rendered
    const inputField = screen.getByPlaceholderText(
      /filter by title or author/i
    );

    expect(inputField).toBeInTheDocument();
  });

  it("filters recipes by title and author when input is typed", () => {
    const setFilteredRecipesMock = vi.fn();

    render(
      <FilterRecipeListComponent
        recipes={mockRecipes}
        setFilteredRecipes={setFilteredRecipesMock}
      />
    );

    const inputField = screen.getByPlaceholderText(
      /filter by title or author/i
    );

    fireEvent.change(inputField, { target: { value: "Recipe 1" } });

    expect(setFilteredRecipesMock).toHaveBeenCalledWith([
      {
        id: 1,
        title: "Recipe 1",
        author: "Author A",
        createdAt: date,
        updatedAt: date,
      },
    ]);
  });

  it("filters recipes by author when input is typed", () => {
    const setFilteredRecipesMock = vi.fn();

    render(
      <FilterRecipeListComponent
        recipes={mockRecipes}
        setFilteredRecipes={setFilteredRecipesMock}
      />
    );

    const inputField = screen.getByPlaceholderText(
      /filter by title or author/i
    );

    fireEvent.change(inputField, { target: { value: "Author" } });

    expect(setFilteredRecipesMock).toHaveBeenCalledWith([
      {
        id: 1,
        title: "Recipe 1",
        author: "Author A",
        createdAt: date,
        updatedAt: date,
      },
      {
        id: 2,
        title: "Recipe 2",
        author: "Author B",
        createdAt: date,
        updatedAt: date,
      },
      {
        id: 3,
        title: "Recipe 3",
        author: "Author C",
        createdAt: date,
        updatedAt: date,
      },
    ]);
  });

  it("filters out recipes when input is not matching anything", () => {
    const setFilteredRecipesMock = vi.fn();

    render(
      <FilterRecipeListComponent
        recipes={mockRecipes}
        setFilteredRecipes={setFilteredRecipesMock}
      />
    );

    const inputField: HTMLElement = screen.getByPlaceholderText(
      /filter by title or author/i
    );

    fireEvent.change(inputField, { target: { value: "ö" } });

    expect(setFilteredRecipesMock).toHaveBeenCalledWith([]);
  });

  it("resets the filter when the input is cleared", () => {
    const setFilteredRecipesMock = vi.fn();

    render(
      <FilterRecipeListComponent
        recipes={mockRecipes}
        setFilteredRecipes={setFilteredRecipesMock}
      />
    );

    const inputField = screen.getByPlaceholderText(
      /filter by title or author/i
    );

    fireEvent.change(inputField, { target: { value: "Recipe" } });
    fireEvent.change(inputField, { target: { value: "" } });

    expect(setFilteredRecipesMock).toHaveBeenCalledWith(mockRecipes);
  });
});
