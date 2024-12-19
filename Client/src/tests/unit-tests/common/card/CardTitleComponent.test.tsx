import { render, screen } from "@testing-library/react";
import CardTitleComponent from "../../../../components/common/card/CardTitleComponent.tsx";

describe("CardTitleComponent Component", () => {
  test("renders the title correctly", () => {
    const title = "Delicious Recipe";

    render(<CardTitleComponent title={title} />);

    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("renders title and heart icon", () => {
    render(<CardTitleComponent title="Test Recipe" />);

    expect(screen.getByText("Test Recipe")).toBeInTheDocument();
    expect(screen.getByTitle("Add to favorites")).toBeInTheDocument();
  });

  test("applies custom h1Class correctly", () => {
    const title = "Recipe Title";
    const h1Class = "custom-h1-class";

    render(<CardTitleComponent title={title} h1Class={h1Class} />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toHaveClass(
      "flex justify-between p-3 font-semibold custom-h1-class"
    );
  });
});
