import { RecipeComment } from "../../../interfaces/RecipeComment";

interface CommentCardProps {
  comment: RecipeComment;
}

const CommentCardComponent = (props: CommentCardProps) => {
  const { title, description, name, createdAt } = props.comment;

  return (
    <div className="p-5 bg-stone-100 shadow-lg mt-5">
      <p className="text-xl font-medium pb-5">{title}</p>
      <hr />

      <p className="py-5 border border-2 p-3">{description}</p>

      <hr />

      <small className="flex justify-between w-full pt-4">
        <span className="flex items-center">{name}</span>
        <span>{createdAt}</span>
      </small>
    </div>
  );
};

export default CommentCardComponent;
