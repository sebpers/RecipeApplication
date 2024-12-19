export interface Me {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  isAuthenticated: boolean;
  roles: string[];
  recipes: string[];
  description: string;
}