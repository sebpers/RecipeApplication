import { FaHeart } from "react-icons/fa"

type PropTitle = {
  title: string | undefined;
  titleClass?: string;
  h1Class?: string;
}

const RecipeCardTitle = (props: PropTitle) => {
  const { title, titleClass, h1Class } = props;

  return (
    <h1 className={`flex justify-between p-3 font-semibold ${h1Class}`}>
      {title} <FaHeart title="Add to favorites" size="20" className={`text-red-600 inline-block ${titleClass}`}/>
    </h1>
  )
}

export default RecipeCardTitle