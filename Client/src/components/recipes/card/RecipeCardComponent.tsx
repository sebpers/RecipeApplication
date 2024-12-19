import { Link } from "react-router-dom";

interface RecipeCardProps {
  children: React.ReactNode;
  recipeId: number;
}

const RecipeCardComponent = ({ children, recipeId }: RecipeCardProps) => {
  return (
    <Link
      to={`/recipes/recipe/${recipeId}`}
      className="relative w-80 border shadow-lg my-6"
    >
      {children}
    </Link>
  );
};

export default RecipeCardComponent;
