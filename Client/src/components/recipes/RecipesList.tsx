import { useEffect, useState } from "react";
import Recipe from "./Recipe";
import { getRecipesListInformation } from "../../services/RecipeService";
import RecipeListInformation from "../../types/RecipeListInformation";
import FilterRecipeListComponent from "../filter/FilterRecipeListComponent";

const RecipesList = () => {
  const [recipes, setRecipes] = useState<RecipeListInformation[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<
    RecipeListInformation[]
  >([]);

  const fetchRecipeListInformation = async () => {
    const result: RecipeListInformation[] = await getRecipesListInformation();

    setRecipes(result);
    setFilteredRecipes(result);
  };

  useEffect(() => {
    fetchRecipeListInformation();
  }, []);

  const updateRecipeListAfterDelete = async () => {
    await fetchRecipeListInformation();
  };

  return (
    <div className="container flex flex-col p-4">
      <div className="flex justify-center">
        <FilterRecipeListComponent
          recipes={recipes}
          setFilteredRecipes={setFilteredRecipes}
        />
      </div>
      {/* Implement pagination */}
      <div className="flex flex-wrap justify-center items-start space-x-10">
        {filteredRecipes?.length ? (
          filteredRecipes.map((r: RecipeListInformation) => (
            <Recipe
              recipe={r}
              key={r.id}
              updateRecipeListAfterDelete={updateRecipeListAfterDelete}
            />
          ))
        ) : (
          <p className="mt-5 italic">No recipes created yet...</p>
        )}
      </div>
    </div>
  );
};

export default RecipesList;
