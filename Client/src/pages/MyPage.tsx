import profile1 from "../assets/profile1.png";
import { useEffect, useState } from "react";
import Recipe from "../components/recipes/Recipe";
import useAuth from "../hooks/auth/useAuth";
import CreateRecipePage from "./CreateRecipePage";
import { getMyRecipes } from "../services/RecipeService";
import { updateDescription } from "../services/UserService";
import SecondaryButtonComponent from "../components/common/buttons/SecondaryButtonComponent";
import SubmitButtonComponent from "../components/common/buttons/SubmitButtonComponent";
import AuthorTabComponent from "../components/authors/page/AuthorTabComponent";
import { useRoleGuard } from "../hooks/auth/useRoleGuard";

const MyPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("description");
  const [showCreateRecipeForm, setShowCreateRecipeForm] =
    useState<boolean>(false);
  const [recipes, setRecipes] = useState([]);
  const [showDescriptionDialog, setShowDescriptionDialog] =
    useState<boolean>(false);
  const [originalDescription, setOriginalDescription] = useState<
    string | undefined
  >(user?.description);
  const [description, setDescription] = useState<string | undefined>(
    user?.description
  );

  useRoleGuard(["Author", "Admin"]);

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
    h1: "md:text-xl text-gray-900 dark:text-white tracking-widest text-center uppercase",
  };

  const onAddRecipe = (): void => {
    setShowCreateRecipeForm(true);
  };

  const onSetActiveTab = (text: string) => {
    setActiveTab(text);
    setShowCreateRecipeForm(false);
  };

  const onCancelEditDescription = () => {
    setDescription(originalDescription); // Reset to original value
    setShowDescriptionDialog(false);
  };

  const onSaveDescription = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const descriptionToSave = description ?? ""; // Make it certain it's defined

    if (user?.id) {
      await updateDescription(descriptionToSave, user?.id);
      setShowDescriptionDialog(false);
    }
  };

  return (
    <div className="container h-full shadow-xl rounded pt-10 p-5 flex flex-col">
      <div className="flex flex-col mx-auto">
        <img
          className="border border-3 shadow-lg object-contain h-48 w-48 rounded-full"
          src={profile1}
          alt="Profile picture"
        />

        <p className="text-center mt-4 italic">
          {user?.firstName} {user?.lastName} - {user?.roles}
        </p>
      </div>

      <AuthorTabComponent setActiveTab={setActiveTab} activeTab={activeTab} />

      {showCreateRecipeForm && (
        <CreateRecipePage onSetActiveTab={onSetActiveTab} />
      )}

      <main className="mt-5">
        <section className="w-full justify-items-center">
          <article className="w-full max-w-screen-md flex flex-col ">
            {activeTab === "description" && (
              <>
                <h1
                  className={`flex justify-center items-center ${classes.h1}`}
                >
                  My story
                </h1>

                <div className="mt-4 italic mx-auto">
                  {description && !showDescriptionDialog && (
                    <>
                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            setOriginalDescription(description); // Save the current value
                            setShowDescriptionDialog(true);
                          }}
                          className="btn-blue-sm text-sm"
                        >
                          Edit
                        </button>
                      </div>
                      <p>{description}</p>
                    </>
                  )}

                  {!description && !showDescriptionDialog && (
                    <>
                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            setOriginalDescription(description); // Save the current value
                            setShowDescriptionDialog(true);
                          }}
                          className="btn-green-sm btn-green-sm:hover text-sm"
                        >
                          Add story
                        </button>
                      </div>
                      <p className="mt-3">Nothing here to tell...</p>
                    </>
                  )}
                </div>

                {showDescriptionDialog && (
                  <form
                    onSubmit={onSaveDescription}
                    className="mx-auto md:w-2/4 w-full flex flex-col"
                  >
                    <textarea
                      placeholder="Tell vistors your story..."
                      rows={6}
                      className="w-full mx-auto p-2 bg-dark-500 border border-2"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                    <div className="flex justify-end space-x-5 mt-3">
                      <SecondaryButtonComponent
                        onClickFunc={onCancelEditDescription}
                      />
                      <SubmitButtonComponent />
                    </div>
                  </form>
                )}
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
                  <div className="flex flex-wrap justify-center md:space-x-10">
                    {recipes?.length ? (
                      recipes?.map((r) => (
                        <Recipe recipe={r} key={r.id} classes={"!w-48"} />
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
