type RecipeListInformation = {
  id: number;
  title: string;
  author: string;
  createdAt: Date;
  updatedAt?: Date;
  userId: string;
  isFavorited: boolean;
  image?: string;
};
export default RecipeListInformation;
