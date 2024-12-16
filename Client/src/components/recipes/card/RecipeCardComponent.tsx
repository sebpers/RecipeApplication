import { Link } from "react-router-dom";

const RecipeCardComponent = ({ children, recipeId }) => {
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
