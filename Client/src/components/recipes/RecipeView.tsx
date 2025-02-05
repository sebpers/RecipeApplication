import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getById } from "../../services/RecipeService.ts";
import Recipe from "../../types/Recipe.tsx";
import RecipeTabs from "./RecipeTabs.tsx";
import RecipeCardDescription from "./card/RecipeCardDescription.tsx";
import RecipeCardAuthorBadgeComponent from "./card/RecipeCardAuthorBadgeComponent.tsx";
import RecipeImageComponent from "./card/RecipeImageComponent.tsx";
import CardTitleComponent from "../common/card/CardTitleComponent.tsx";

const RecipeView = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchRecipeListInformation = async () => {
    try {
      if (id) {
        const result: Recipe = await getById(id.toString());
        setRecipe(result);
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  useEffect(() => {
    fetchRecipeListInformation();
  }, []);

  const updateRecipe = async (id: number) => {
    try {
      const result = await getById(id);
      if (result) {
        setRecipe(result);
      }
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="border shadow-lg my-6 m:w-2/4 h-auto pb-2 mx-auto rounded-xl">
      <RecipeImageComponent
        recipe={recipe}
        updateRecipe={updateRecipe}
        updateList={navigateBack}
        displayMenu="true"
      />

      <div className="p-3">
        <CardTitleComponent
          title={recipe?.title}
          recipeId={recipe?.id}
          favoritedBy={recipe?.favoritedBy}
        />

        <RecipeCardDescription description={recipe?.description} />

        <RecipeTabs
          ingredients={recipe?.ingredients}
          instructions={recipe?.instructions}
          recipeId={recipe?.id}
        />

        <RecipeCardAuthorBadgeComponent
          author={recipe?.author}
          userId={recipe?.userId}
        />
      </div>
    </div>
  );
};

export default RecipeView;
