import React, { useState } from 'react';
import UserContext, { UserContextType } from './userContext';

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }: UserProviderProps) => {
  const [currentUser, setUser] = useState();
  const [userId, setUserId] = useState<string>('');

  const provideUser = (currentUser: any): void => {
    setUser(currentUser);
    setUserId(currentUser.id);
  }

  const contextValue: UserContextType = {
    currentUser,
    userId,
    provideUser
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
