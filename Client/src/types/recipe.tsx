type Recipe = {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  author: string;
  userId: string;
  favoritedBy: {
    recipeId: number;
    userId: string;
  };
};

export default Recipe;
