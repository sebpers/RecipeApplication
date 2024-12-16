import { useEffect, useState } from "react";
import Recipe from "./Recipe";
import { getRecipesListInformation } from "../../services/recipeService";
import RecipeListInformation from "../../types/recipeListInformation";
import FilterRecipeList from "../filter/FilterRecipeList";

const RecipesList = () => {
  const [recipes, setRecipes] = useState<RecipeListInformation[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<
    RecipeListInformation[]
  >([]);

  useEffect(() => {
    const recipeListInformation = async () => {
      const result: RecipeListInformation[] = await getRecipesListInformation();

      setRecipes(result);
      setFilteredRecipes(result);
    };

    recipeListInformation();
  }, []);

  return (
    <div className="container flex flex-col p-4">
      <div className="flex justify-center">
        <FilterRecipeList
          recipes={recipes}
          setFilteredRecipes={setFilteredRecipes}
        />
      </div>

      <div className="flex flex-wrap justify-center items-start space-x-10">
        {filteredRecipes?.length ? (
          filteredRecipes.map((r: RecipeListInformation) => (
            <Recipe recipe={r} key={r.id} />
          ))
        ) : (
          <i className="mt-5">No recipes created yet...</i>
        )}
      </div>
    </div>
  );
};

export default RecipesList;
