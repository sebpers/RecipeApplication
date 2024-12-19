import { createContext } from "react";
import { Me } from "../../interfaces/Me";

export interface AuthContextType {
  isAuthenticated: boolean;
  user: Me | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
