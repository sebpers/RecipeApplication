type PropDescription = {
  description: string | undefined;
};

const RecipeCardDescription = (props: PropDescription) => {
  return <p className="p-3 italic">{props?.description}</p>;
};

export default RecipeCardDescription;
