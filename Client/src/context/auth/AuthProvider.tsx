import {useState, useEffect } from 'react';

// Define the context to manage authentication state
import AuthContext, { AuthContextType } from '../auth/authContext';
import { logoutUser, me, validateUserToken } from '../../services/authService';
import { Me } from '../../interfaces/me';

interface Props {
  children: React.ReactNode
}

// AuthProvider to wrap your app and provide the context
const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<Me | null>(null);  // Store logged-in user's information

  // const [loading, setLoading] = useState(true);

  // Check for token validity when the app loads
  useEffect(() => {
    const validateToken = async () => {
      const response = await validateUserToken();

      if (response.status === 200) {
          setIsAuthenticated(true);
      } else {
          setIsAuthenticated(false);
      }
      // setLoading(false);  // Set loading to false after checking token
    };

    validateToken();
  }, []);

   // Fetch logged in user info when authentication state changes (after login or validation)
   useEffect(() => {
    const fetchUserInfo = async () => {
      if (isAuthenticated) {
        const response = await me();
        console.log('response: ', response)
        if (response.status === 200) {
            setUser(response.data);  // Store user info in state
        } else {
            setUser(null);  // In case of failure, ensure user is cleared
        }
      } else {
          setUser(null);  // If not authenticated, clear user info
      }
    };

    fetchUserInfo();
}, [isAuthenticated]);  // Trigger fetchUserInfo whenever authentication status changes


  // Function to handle logout
  const logout = () => {
    setIsAuthenticated(false);
    logoutUser()
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    setIsAuthenticated,
    logout,
    user
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
