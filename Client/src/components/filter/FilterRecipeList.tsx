import RecipeListInformation from "../../types/recipeListInformation";

const FilterRecipeList = (props: {
    recipes: RecipeListInformation[];
    setFilteredRecipes: (r: RecipeListInformation[]) => RecipeListInformation[];
}) => {

    const handleFilter = (e) => {
        e.preventDefault();

        const { recipes, setFilteredRecipes } = props;

        const filterValue: string = e.target.value.toLowerCase()?.trim();

        if (!filterValue) {
            setFilteredRecipes(recipes); // Reset to original recipes
            return;
          }

        const filterResult: RecipeListInformation[] = recipes.filter(r => {
            return r.title.toLowerCase().includes(filterValue) || r.author.toLowerCase().includes(filterValue)
        });

        setFilteredRecipes(filterResult);
    }

  return (
    <div className="w-2/4 bg-red-500">
        <input
            className="w-full border p-2"
            type="text"
            placeholder="Filter by title or author.."
            onChange={ handleFilter } />
    </div>
  )
}

export default FilterRecipeList