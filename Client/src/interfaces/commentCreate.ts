export interface CommentCreate {
  title: string;
  description: string;
  name: string;
  userId: string | undefined;
  recipeId: number;
}