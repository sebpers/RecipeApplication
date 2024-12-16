import RecipeImageComponent from "./card/RecipeImageComponent";
import RecipeCardComponent from "./card/RecipeCardComponent";
import RecipeCardAuthorBadge from "./card/RecipeCardAuthorBadge";
import RecipeCardTitle from "./card/RecipeCardTitle";

const Recipe = ({ recipe }) => {
  const { id, title, author, userId } = recipe;

  return (
    <RecipeCardComponent recipeId={id}>
      <RecipeImageComponent userId={userId} recipeId={id} />
      <RecipeCardTitle title={title} />
      <RecipeCardAuthorBadge userId={userId} author={author} />
    </RecipeCardComponent>
  );
};

export default Recipe;
