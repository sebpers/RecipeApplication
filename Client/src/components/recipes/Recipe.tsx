import RecipeImageComponent from "./card/RecipeImageComponent";
import RecipeCardComponent from "./card/RecipeCardComponent";
import RecipeCardAuthorBadgeComponent from "./card/RecipeCardAuthorBadgeComponent";
import CardTitleComponent from "../common/card/CardTitleComponent";
import RecipeListInformation from "../../types/RecipeListInformation";

interface RecipeProps {
  updateList?: () => void;
  recipe: RecipeListInformation;
  classes?: string;
}

const Recipe = ({ recipe, updateList, classes }: RecipeProps) => {
  const { id, title, author, userId, image, isFavorited } = recipe;

  return (
    <RecipeCardComponent recipeId={id} classes={classes}>
      <RecipeImageComponent
        recipeId={id}
        image={image}
        updateList={updateList}
        displayRecipeMenu={false} // Only display menu when recipe is clicked
      />
      <CardTitleComponent
        title={title}
        recipeId={recipe.id}
        isFavorited={isFavorited}
      />
      <RecipeCardAuthorBadgeComponent userId={userId} author={author} />
    </RecipeCardComponent>
  );
};
export default Recipe;
