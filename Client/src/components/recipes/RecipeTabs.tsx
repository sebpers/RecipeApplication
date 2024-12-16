import { useEffect, useState } from "react";
import { getRecipeComments } from "../../services/commentService";
import { RecipeComment } from "../../interfaces/recipeComment";
import CommentCardComponent from "../comments/commentCard/CommentCardComponent";
import AddCommentComponent from "../comments/AddCommentComponent";
import SecondaryButtonComponent from "../common/buttons/SecondaryButtonComponent";
import useAuth from "../../hooks/auth/useAuth";
import RecipeTabButtons from "./tabs/RecipeTabButtons";
import RecipeTabContent from "./tabs/RecipeTabContent";

interface TabProps {
  ingredients: string[] | undefined;
  instructions: string[] | undefined;
  recipeId: number | undefined;
}

const RecipeTabs = (props: TabProps) => {
  const [activeTab, setActiveTab] = useState<string>("Ingredients");
  const [comments, setComments] = useState<RecipeComment[]>();
  const [addCommentIsOpen, setAddCommentIsOpen] = useState<boolean>(false);

  const { user } = useAuth();

  const { ingredients, instructions, recipeId } = props;

  const fetchComments = async () => {
    try {
      if (recipeId && recipeId !== 0) {
        const commentsList: RecipeComment[] = await getRecipeComments(recipeId);

        setComments(commentsList);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [recipeId]);

  const toggleAddComment = (): void => {
    setAddCommentIsOpen(!addCommentIsOpen);
  };

  const onSetActiveTab = (tab: string): void => {
    setActiveTab(tab);
  };

  return (
    <div className="pl-2">
      <div className="flex space-x-4">
        <RecipeTabButtons
          activeTab={activeTab}
          tabValue="Ingredients"
          onSetActiveTab={onSetActiveTab}
        />

        <RecipeTabButtons
          activeTab={activeTab}
          tabValue="Instructions"
          onSetActiveTab={onSetActiveTab}
        />

        <RecipeTabButtons
          activeTab={activeTab}
          tabValue="Comments"
          textTernary={
            comments && comments?.length > 0 ? `(${comments?.length})` : ""
          }
          onSetActiveTab={onSetActiveTab}
        />
      </div>

      {/* Display content based on active tab */}
      <div>
        {activeTab === "Ingredients" ? (
          <RecipeTabContent
            contentArray={ingredients ?? []}
            classes="list-disc"
          />
        ) : activeTab === "Instructions" ? (
          <RecipeTabContent
            contentArray={instructions ?? []}
            classes="list-decimal"
          />
        ) : activeTab === "Comments" ? (
          <div className="my-5">
            {user?.isAuthenticated && (
              <SecondaryButtonComponent
                text={addCommentIsOpen ? "Close" : "+ Comment"}
                onClickFunc={toggleAddComment}
              />
            )}

            {user?.isAuthenticated && addCommentIsOpen && (
              <div>
                <AddCommentComponent
                  onCommentAdded={fetchComments}
                  onClickFunc={toggleAddComment}
                />
              </div>
            )}

            {comments?.map((comment: RecipeComment) => (
              <CommentCardComponent key={comment.id} comment={comment} />
            ))}
          </div>
        ) : (
          <div>Not found...</div>
        )}
      </div>
    </div>
  );
};

export default RecipeTabs;
