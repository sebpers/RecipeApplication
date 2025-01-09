import RecipeImageComponent from "./card/RecipeImageComponent";
import RecipeCardComponent from "./card/RecipeCardComponent";
import RecipeCardAuthorBadgeComponent from "./card/RecipeCardAuthorBadgeComponent";
import CardTitleComponent from "../common/card/CardTitleComponent";
import RecipeListInformation from "../../types/RecipeListInformation";

interface RecipeProps {
  updateRecipeListAfterDelete(): void;
  recipe: RecipeListInformation;
  classes?: string;
}

const Recipe = ({
  recipe,
  updateRecipeListAfterDelete,
  classes,
}: RecipeProps) => {
  const { id, title, author, userId } = recipe;

  return (
    <RecipeCardComponent recipeId={id} classes={classes}>
      <RecipeImageComponent
        recipeId={id}
        updateRecipeListAfterDelete={updateRecipeListAfterDelete}
      />
      <CardTitleComponent title={title} />
      <RecipeCardAuthorBadgeComponent userId={userId} author={author} />
    </RecipeCardComponent>
  );
};

export default Recipe;
