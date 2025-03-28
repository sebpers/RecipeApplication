import { Link } from "react-router-dom";

interface RecipeCardProps {
  children: React.ReactNode;
  recipeId: number;
  classes?: string;
}

const RecipeCardComponent = ({
  children,
  recipeId,
  classes,
}: RecipeCardProps) => {
  return (
    <Link
      to={`/recipes/recipe/${recipeId}`}
      className={`relative w-80 border shadow-lg rounded-xl my-6 pb-2 ${classes}`}
    >
      {children}
    </Link>
  );
};

export default RecipeCardComponent;
