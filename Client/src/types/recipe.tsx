type Recipe = {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  author: string;
  userId: string;
  image?: string;
};

export default Recipe;
