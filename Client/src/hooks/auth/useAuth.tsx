import { useContext } from "react";
import AuthContext from '../../context/auth/authContext';

const useAuth = () => {
    const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within a authProvider');
  }

  return context;
};

export default useAuth;
