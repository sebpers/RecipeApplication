import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getById } from "../../services/recipeService.ts";
import Recipe from "../../types/recipe.tsx";
import RecipeTabs from "./RecipeTabs.tsx";
import RecipeCardTitle from "./card/RecipeCardTitle.tsx";
import RecipeCardDescription from "./card/RecipeCardDescription.tsx";
import RecipeCardAuthorBadge from "./card/RecipeCardAuthorBadge.tsx";
import RecipeImageComponent from "./card/RecipeImageComponent.tsx";

const RecipeView = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (id) {
          const result: Recipe = await getById(id.toString());

          setRecipe(result);
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  return (
    <div className="border shadow-lg my-6 w-2/4 h-auto pb-2">
      <RecipeImageComponent recipeId={recipe?.id} authorId={recipe?.userId} />
      <div className="p-3">
        <RecipeCardTitle title={recipe?.title} />
        <RecipeCardDescription description={recipe?.description} />
        <RecipeTabs
          ingredients={recipe?.ingredients}
          instructions={recipe?.instructions}
          recipeId={recipe?.id}
        />
        <RecipeCardAuthorBadge
          author={recipe?.author}
          userId={recipe?.userId}
        />
      </div>
    </div>
  );
};

export default RecipeView;
