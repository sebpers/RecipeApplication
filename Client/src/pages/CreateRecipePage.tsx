import { useState } from "react";
import SubmitButtonComponent from "../components/common/buttons/SubmitButtonComponent";
import ListInputComponent from "../components//recipes/ListInputComponent";
import { createRecipe } from "../services/RecipeService";
import useAuth from "../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import Recipe from "../types/Recipe";
import SecondaryButtonComponent from "../components/common/buttons/SecondaryButtonComponent";

const CreateRecipePage = (props) => {
  const { user } = useAuth();
  const { onSetActiveTab } = props;

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{
    [key: string]: string | boolean | undefined;
  }>({});

  const navigate = useNavigate();

  const handleListChange = (
    fieldName: "ingredients" | "instructions",
    updatedList: string[]
  ) => {
    if (fieldName === "ingredients") {
      checkInputErrors("ingredientsRequired");
      setIngredients(updatedList);
    } else if (fieldName === "instructions") {
      checkInputErrors("instructionsRequired");

      setInstructions(updatedList);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
    }
  };

  const checkInputErrors = (errorType: string) => {
    if (errors[errorType]?.length > 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [errorType]: undefined, // Clear the error by setting it to undefined
      }));
    }
  };

  const onCancel = () => {
    // Reset states
    setTitle("");
    setDescription("");
    setIngredients([]);
    setInstructions([]);

    onSetActiveTab("recipes");
  };

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    e.stopPropagation();

    setErrors({});

    if (user?.id) {
      const formData = new FormData();
      formData.append("userId", user?.id);
      formData.append("title", title.trim());
      formData.append("description", description.trim());

      // Send each ingredient as a separate key-value to get "normal" array instead of stringified
      ingredients.forEach((ingredient) =>
        formData.append("ingredients", ingredient.trim())
      );

      instructions.forEach((instructions) =>
        formData.append("instructions", instructions.trim())
      );

      if (image) {
        formData.append("image", image);
      }

      if (ingredients?.length === 0 || instructions?.length === 0) {
        setErrors({
          ingredientsRequired:
            ingredients?.length === 0 && "Ingrediens are required",
          instructionsRequired:
            instructions?.length === 0 && "Instructions are required",
        });

        return;
      }

      addRecipe(formData);
    }
  };

  const addRecipe = async (form: FormData) => {
    try {
      const createdRecipe: Recipe = await createRecipe(form);

      if (!createdRecipe?.errors?.length) {
        navigate(`/recipes/recipe/${createdRecipe.id}`);
      } else {
        console.error("Recipe creation errors:", createdRecipe.errors);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error adding recipe:", error.message);
        setErrors((prevErrors) => ({
          ...prevErrors,
          addingRecipe: error.message,
        }));
      } else {
        console.error("Unknown error occurred:", error);
      }
    }
  };

  return (
    <div className="container">
      <form className="max-w-sm mx-auto mt-5" onSubmit={onHandleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Add title..."
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            id="description"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            placeholder="Add description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <ListInputComponent
            labelName="Ingredients"
            fieldName="ingredients"
            listItems={ingredients}
            onListChange={handleListChange}
          />
          {errors?.ingredientsRequired && (
            <p className="text-red-600"> {errors.ingredientsRequired}</p>
          )}
        </div>

        <div className="mb-5">
          <ListInputComponent
            labelName="Instructions"
            fieldName="instructions"
            listItems={instructions}
            onListChange={handleListChange}
          />
          {errors?.instructionsRequired && (
            <p className="text-red-600"> {errors.instructionsRequired}</p>
          )}
        </div>

        <div className="mb-5">
          <input
            type="file"
            className="rounded"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {errors?.addingRecipe && (
          <p className="text-red-600">
            Could not create recipe: {errors.addingRecipe}
          </p>
        )}

        <div className="flex justify-between">
          <SecondaryButtonComponent onClickFunc={onCancel} />
          <SubmitButtonComponent />
        </div>
      </form>
    </div>
  );
};

export default CreateRecipePage;
