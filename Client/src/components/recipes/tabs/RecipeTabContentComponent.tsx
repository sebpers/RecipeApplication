interface RecipeTabContentProps {
  contentArray: string[];
  classes?: string;
}

const RecipeTabContentComponent = (props: RecipeTabContentProps) => {
  const { contentArray, classes } = props;

  return (
    <ul className={`${classes} p-3`}>
      {contentArray?.map((ingredient: string, index: number) => (
        <li className="p-1" key={index}>
          {ingredient}
        </li>
      ))}
    </ul>
  );
};

export default RecipeTabContentComponent;
