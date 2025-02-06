import { useEffect, useState } from "react";
import useAuth from "../../../hooks/auth/useAuth";
import { hasRole } from "../../../helpers/role";
import CardMenuComponent from "./CardMenuComponent";
import { deleteRecipe } from "../../../services/RecipeService";
import ConfirmDeleteModalComponent from "../../common/modal/ConfirmDeleteModalComponent";
import Recipe from "../../../types/Recipe";
import ConfirmModelEditComponent from "../../common/modal/ConfirmModalEditComponent";
import UpdateRecipeFormComponent from "../../forms/recipe/UpdateRecipeFormComponent";

interface RecipeImageComponentProps {
  recipe?: Recipe | null;
  image?: string;
  updateList?: () => void;
  updateRecipe?: (id: number) => void;
  displayMenu: string;
}

const RecipeImageComponent = (props: RecipeImageComponentProps) => {
  const [isRecipeAuthor, setIsRecipeAuthor] = useState<boolean | undefined>(
    false
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const { user } = useAuth();
  const { recipe, image, updateRecipe, updateList, displayMenu } = props;
  const fallbackImg =
    "https://assets.tmecosys.com/image/upload/t_web600x528/img/recipe/ras/Assets/c3235163-5697-4911-84e9-633c78c9a35b/Derivates/c15df8ba-50ba-4d77-8292-bac5014b9cb0.jpg";

  const img =
    image || recipe?.image
      ? `data:image/jpeg;base64,${image || recipe?.image}`
      : fallbackImg;

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOutsideClick = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  // Attach the event listener to handle clicks outside
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    const result = hasRole(user, ["Author"], recipe?.userId);
    setIsRecipeAuthor(result);
  }, [recipe?.userId, user]);

  const showConfirmEditModal = () => {
    setShowEditModal(true);
  };

  const onConfirmEdit = (answer: boolean): void => {
    if (answer) {
      handleEdit();
    }
    setShowEditModal(false);
  };

  const handleEdit = async () => {
    if (recipe?.id && updateRecipe) {
      updateRecipe(recipe.id);
    } else {
      throw "Recipe id not found";
    }
  };

  const handleDelete = async () => {
    if (recipe?.id) {
      const res = await deleteRecipe(recipe?.id);
      if (res?.deleted && updateList) {
        updateList();
      }
    } else {
      throw "Recipe id not found";
    }
  };

  const showConfirmDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const onConfirmDelete = (answer: boolean): void => {
    if (answer) {
      handleDelete();
    }

    setShowDeleteModal(false);
  };

  return (
    <div className="relative">
      <div className="">
        <img
          src={img}
          alt="Recipe Image"
          className="w-full h-auto rounded-xl"
        />
      </div>

      {/* Button to trigger dropdown - only display menu when recipe is clicked */}
      {isRecipeAuthor && displayMenu && (
        <button
          id="dropdownMenuIconButton"
          onClick={handleMenuClick}
          className="absolute top-2 right-2 inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 4 15"
          >
            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
          </svg>
        </button>
      )}

      {isRecipeAuthor && isDropdownOpen && (
        <div className="absolute top-10 right-2" onClick={handleMenuClick}>
          <CardMenuComponent
            onEdit={showConfirmEditModal}
            onDelete={showConfirmDeleteModal}
          />
        </div>
      )}

      {showEditModal && recipe && (
        <ConfirmModelEditComponent title={`${recipe.title}`}>
          <UpdateRecipeFormComponent
            onConfirm={onConfirmEdit}
            recipe={recipe}
          />
        </ConfirmModelEditComponent>
      )}

      {showDeleteModal && recipe && (
        <ConfirmDeleteModalComponent
          onConfirm={onConfirmDelete}
          title="recipe"
        />
      )}
    </div>
  );
};

export default RecipeImageComponent;
