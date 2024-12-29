import profile1 from "../assets/profile1.png";
import { useEffect, useState } from "react";
import Recipe from "../components/recipes/Recipe";
import useAuth from "../hooks/auth/useAuth";
import CreateRecipePage from "./CreateRecipePage";
import { getMyRecipes } from "../services/RecipeService";

const MyPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("description");
  const [showCreateRecipeForm, setShowCreateRecipeForm] =
    useState<boolean>(false);
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    if (user?.id) {
      try {
        const result = await getMyRecipes(user?.id);
        setRecipes(result);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [user?.id]);

  const classes = {
    button: "focus:outline-none",
    active: "text-purple-600",
    inactive: "hover:text-gray-600",
    h1: "text-4xl text-gray-900 dark:text-white tracking-widest text-center uppercase",
  };

  const onAddRecipe = (): void => {
    setShowCreateRecipeForm(true);
  };

  const onSetActiveTab = (text: string) => {
    setActiveTab(text);
    setShowCreateRecipeForm(false);
  };

  const updateRecipeListAfterDelete = async () => {
    await fetchRecipes();
  };

  return (
    <div className="container h-full shadow-xl rounded pt-10 p-5 flex flex-col">
      <div className="flex justify-center">
        <img
          className="border border-3 shadow-lg object-contain h-48 w-48 rounded-full"
          src={profile1}
          alt="Profile picture"
        />
      </div>

      <div className="mx-auto mt-5 pb-2 border-b-4 w-80 border-indigo-500">
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => onSetActiveTab("description")}
            className={`${classes.button} ${
              activeTab === "description" ? classes.active : classes.inactive
            }`}
          >
            About
          </button>

          <button
            onClick={() => setActiveTab("recipes")}
            className={`${classes.button} ${
              activeTab === "recipes" ? classes.active : classes.inactive
            }`}
          >
            Recipes
          </button>
          <button
            onClick={() => onSetActiveTab("messages")}
            className={`${classes.button} ${
              activeTab === "messages" ? classes.active : classes.inactive
            }`}
          >
            Contact
          </button>
        </div>
      </div>
      {showCreateRecipeForm && (
        <CreateRecipePage onSetActiveTab={onSetActiveTab} />
      )}

      <main className="mt-5">
        <section className="w-auto justify-items-center">
          <article className="max-w-screen-md flex flex-col ">
            {activeTab === "description" && (
              <>
                <h1
                  className={`flex justify-center items-center ${classes.h1}`}
                >
                  My story
                </h1>
                <div className="mt-4 italic mx-auto">
                  {user?.description ? (
                    user?.description
                  ) : (
                    <p>Nothing here to tell...</p>
                  )}
                </div>
              </>
            )}

            {activeTab === "recipes" && !showCreateRecipeForm && (
              <>
                <div className="flex justify-center">
                  <h1 className={`${classes.h1} mr-5`}>Recipes</h1>
                  <button
                    onClick={onAddRecipe}
                    type="button"
                    title="Add recipe"
                    className="px-4 text-sm text-green-500 outline outline-1 rounded-xl hover:bg-green-100"
                  >
                    Add
                  </button>
                </div>
                {
                  <div className="flex flex-wrap justify-center items-start space-x-10">
                    {recipes?.length ? (
                      recipes?.map((r) => (
                        <Recipe
                          recipe={r}
                          key={r.id}
                          updateRecipeListAfterDelete={
                            updateRecipeListAfterDelete
                          }
                        />
                      ))
                    ) : (
                      <p className="mt-5 italic">No recipes created yet...</p>
                    )}
                  </div>
                }
              </>
            )}

            {activeTab === "messages" && (
              <>
                <h1 className={classes.h1}>Messages </h1>
                <p className="mt-4 mx-auto italic">My messages.....</p>
              </>
            )}
          </article>
        </section>
      </main>
    </div>
  );
};

export default MyPage;
