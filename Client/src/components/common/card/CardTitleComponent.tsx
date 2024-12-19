import { FaHeart } from "react-icons/fa";

type PropTitle = {
  title: string | undefined;
  titleClass?: string;
  h1Class?: string;
};

const CardTitleComponent = (props: PropTitle) => {
  const { title, titleClass, h1Class } = props;

  const handleAddToFavorites = (e: React.MouseEvent<SVGElement>): void => {
    e.preventDefault(); // Prevent navigating to recipe
    console.log("Action is currently not implemented");
  };

  return (
    <h1 className={`flex justify-between p-3 font-semibold ${h1Class}`}>
      {title}
      <FaHeart
        id="heart-icon"
        title="Add to favorites"
        size="20"
        className={`text-grey-600 inline-block ${titleClass}`} // Will later on be toggled to red when favored
        onClick={handleAddToFavorites}
      />
    </h1>
  );
};

export default CardTitleComponent;
