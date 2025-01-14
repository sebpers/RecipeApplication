import { useEffect, useState } from "react";
import Recipe from "./Recipe";
import { getRecipesListInformation } from "../../services/RecipeService";
import RecipeListInformation from "../../types/RecipeListInformation";
import FilterRecipeListComponent from "../filter/FilterRecipeListComponent";
import LoadingComponent from "../common/Loading/LoadingComponent";

const RecipesList = () => {
  const [recipes, setRecipes] = useState<RecipeListInformation[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<
    RecipeListInformation[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchRecipeListInformation = async () => {
    setIsLoading(true);
    const result: RecipeListInformation[] = await getRecipesListInformation();
    setIsLoading(false);
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
      {!isLoading ? (
        <>
          <div className="flex justify-center w-full">
            <FilterRecipeListComponent
              recipes={recipes}
              setFilteredRecipes={setFilteredRecipes}
            />
          </div>

          {/*!! Implement pagination */}
          <div className="flex flex-wrap justify-center items-start space-x-10 min-w-full   max-w-screen-md min-w-80">
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
        </>
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
};

export default RecipesList;
