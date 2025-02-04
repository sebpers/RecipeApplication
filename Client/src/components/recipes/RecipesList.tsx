import { useEffect, useState } from "react";
import Recipe from "./Recipe";
import { getRecipesListInformationByPagination } from "../../services/RecipeService";
import RecipeListInformation from "../../types/RecipeListInformation";
import LoadingComponent from "../common/Loading/LoadingComponent";
import PaginateComponent from "../common/pagination/PaginateComponent";
import SearchComponent from "../common/search/SearchComponent";
import { QueriedRecipeResponse } from "../../interfaces/query/recipeQueries";

const RecipesList = () => {
  const [recipes, setRecipes] = useState<RecipeListInformation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalRecipes, setTotalRecipes] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const dropdownPages = ["5", "10", "15", "20", "25", "50"];

  const fetchRecipeListInformation = async (
    pageNumber: number,
    pageSize: number,
    searchTerm: string
  ) => {
    try {
      setIsLoading(true);
      const result: QueriedRecipeResponse =
        await getRecipesListInformationByPagination(
          pageNumber,
          pageSize,
          searchTerm
        );

      setRecipes(result.items);
      setTotalRecipes(result.totalCount);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalRecipes / pageSize);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setPageNumber(page);
    }
  };

  // Handle page size change
  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSize = parseInt(event.target.value, 10);
    setPageSize(newSize);
    setPageNumber(1); // Reset to page 1 when page size changes
  };

  // Handle search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm: string = event.target.value;
    setSearchTerm(searchTerm);

    // Clear previous timeout if it exists
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Prevent database from being hit too often
    const timeout = setTimeout(() => {
      fetchRecipeListInformation(1, pageSize, searchTerm);
    }, 700);

    setDebounceTimeout(timeout);
  };

  useEffect(() => {
    fetchRecipeListInformation(pageNumber, pageSize, searchTerm);
  }, [pageNumber, pageSize]);

  return (
    <div className="container flex flex-col p-4">
      {!isLoading ? (
        <>
          <div className="flex justify-center w-full">
            <SearchComponent
              search={searchTerm}
              handleSearchChange={handleSearchChange}
              placeholder="Search for recipe or author..."
            />
          </div>

          <div className="flex items-center my-4">
            <label className="text-sm text-gray-700">
              <select
                value={pageSize}
                onChange={handlePageSizeChange}
                className="ml-2 border border-gray-300 rounded-md px-2 py-1"
              >
                {dropdownPages.map((p, i) => (
                  <option value={p} key={i}>
                    {p}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex flex-wrap justify-center items-start min-w-full max-w-screen-md min-w-80">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <Recipe
                  key={recipe.id}
                  recipe={recipe}
                  classes="md:ml-5 md:mr-5"
                />
              ))
            ) : (
              <p className="mt-5 italic">No recipes found...</p>
            )}
          </div>
        </>
      ) : (
        <LoadingComponent />
      )}

      <div className="flex justify-center flex-wrap items-center my-4 border-t">
        <label className="text-sm text-gray-700">
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="ml-2 border border-gray-300 rounded-md px-2 py-1"
          >
            {dropdownPages.map((p, i) => (
              <option value={p} key={i}>
                {p}
              </option>
            ))}
          </select>
        </label>

        <PaginateComponent
          currentPage={pageNumber}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default RecipesList;
