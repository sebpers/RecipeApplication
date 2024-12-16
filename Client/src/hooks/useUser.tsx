import { useContext } from 'react';
import UserContext from '../context/user/userContext';

// Custom hook to use the UserContext
const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

export default useUser;