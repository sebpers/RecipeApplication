import RecipeListInformation from "../../types/RecipeListInformation";

export interface QueriedRecipeResponse {
  items: RecipeListInformation[];
  totalCount: number;
}
