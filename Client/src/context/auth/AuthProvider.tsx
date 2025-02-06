import { useState, useEffect } from "react";

import AuthContext, { AuthContextType } from "../auth/authContext";
import {
  logoutUser,
  getMe,
  validateUserToken,
} from "../../services/AuthService";
import { Me } from "../../interfaces/Me";

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<Me | null>(null); // Store logged-in user's information

  // Check for token validity when the app loads
  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await validateUserToken();
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error: unknown) {
        if (error.message === "Invalid or expired token") {
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    };

    validateToken();
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (isAuthenticated) {
        const response = await getMe();
        console.log("auth response: ", response);
        if (response.status === 200) {
          setUser(response.data);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    fetchUserInfo();
  }, [isAuthenticated]);

  const logout = () => {
    setIsAuthenticated(false);
    logoutUser();
    setUser(null);
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    setIsAuthenticated,
    logout,
    user,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
