type RecipeListInformation = {
  id: number;
  title: string;
  author: string;
  createdAt: Date;
  updatedAt?: Date;
  userId: string;
  favoritedBy: {
    recipeId: number;
    userId: string;
  };
  image?: string;
};
export default RecipeListInformation;
