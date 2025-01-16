import { useEffect, useState } from "react";
import useAuth from "../../../hooks/auth/useAuth";
import { hasRole } from "../../../helpers/role";
import CardMenuComponent from "./CardMenuComponent";
import { deleteRecipe } from "../../../services/RecipeService";
import ConfirmDeleteModalComponent from "../../common/modal/ConfirmDeleteModalComponent";

interface RecipeImageComponentProps {
  authorId?: string;
  recipeId: number | undefined;
  updateList: () => void;
}

const RecipeImageComponent = (props: RecipeImageComponentProps) => {
  const [isRecipeAuthor, setIsRecipeAuthor] = useState<boolean | undefined>(
    false
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const { user } = useAuth();

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
    const result = hasRole(user, ["Author"], props.authorId);
    setIsRecipeAuthor(result);
  }, [props.authorId]);

  const handleEdit = () => {
    console.log("Action not implemented yet");
  };

  const handleDelete = async () => {
    if (props?.recipeId) {
      const res = await deleteRecipe(props.recipeId);

      if (res?.deleted) {
        props.updateList();
      }
    } else {
      throw "Recipe id not found";
    }
  };

  const showConfirmDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const onConfirmDelete = (answer: boolean) => {
    if (answer) {
      handleDelete();
    }

    setShowDeleteModal(false);
  };

  return (
    <div className="relative">
      <img
        src="https://assets.tmecosys.com/image/upload/t_web600x528/img/recipe/ras/Assets/c3235163-5697-4911-84e9-633c78c9a35b/Derivates/c15df8ba-50ba-4d77-8292-bac5014b9cb0.jpg"
        alt="Recipe Image"
        className="w-full h-auto"
      />

      {/* Button to trigger dropdown */}
      {isRecipeAuthor && (
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
            onEdit={handleEdit}
            onDelete={showConfirmDeleteModal}
          />
        </div>
      )}

      {showDeleteModal && (
        <ConfirmDeleteModalComponent
          onConfirm={onConfirmDelete}
          title="recipe"
        />
      )}
    </div>
  );
};

export default RecipeImageComponent;
