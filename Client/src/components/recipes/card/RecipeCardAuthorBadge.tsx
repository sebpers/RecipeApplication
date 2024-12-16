import { useNavigate } from "react-router-dom";

type PropsUserIdType = {
  userId: string | undefined;
  author: string | undefined;
};

const RecipeCardAuthorBadge = (props: PropsUserIdType) => {
  const navigate = useNavigate();
  const { userId, author } = props;

  const handleAuthorClick = (e) => {
    e.preventDefault(); // Prevent the wrapper-Link from being triggered

    navigate(`/author/${userId}`);
  };

  return (
    <small className="my-5 p-2 cursor-pointer" onClick={handleAuthorClick}>
      <span className="rounded bg-green-100 px-3 py-1">{author}</span>
    </small>
  );
};

export default RecipeCardAuthorBadge;
