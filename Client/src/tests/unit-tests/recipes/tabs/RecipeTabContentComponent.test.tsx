import { render, screen } from "@testing-library/react";
import RecipeTabContentComponent from "../../../../components/recipes/tabs/RecipeTabContentComponent";

describe("RecipeTabContentComponent", () => {
  test("renders list items from contentArray", () => {
    const contentArray = ["Ingredient 1", "Ingredient 2", "Ingredient 3"];

    render(<RecipeTabContentComponent contentArray={contentArray} />);

    contentArray.forEach((ingredient) => {
      const listItem = screen.getByText(ingredient);

      expect(listItem).toBeInTheDocument();
    });

    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(contentArray.length);
  });

  test("applies custom classes to <ul> element", () => {
    const contentArray = ["Ingredient 1"];
    const customClass = "custom-class";

    render(
      <RecipeTabContentComponent
        contentArray={contentArray}
        classes={customClass}
      />
    );

    const ulElement = screen.getByRole("list");

    expect(ulElement).toHaveClass(customClass);
  });

  test("renders an empty list when contentArray is empty", () => {
    render(<RecipeTabContentComponent contentArray={[]} />);

    const ulElement = screen.getByRole("list");
    const listItems = screen.queryAllByRole("listitem");

    expect(listItems.length).toBe(0);
    expect(ulElement).toBeInTheDocument();
  });

  test("does not crash when contentArray is undefined", () => {
    render(<RecipeTabContentComponent contentArray={undefined} />);

    const ulElement = screen.getByRole("list");
    const listItems = screen.queryAllByRole("listitem");

    expect(listItems.length).toBe(0);
    expect(ulElement).toBeInTheDocument();
  });
});
