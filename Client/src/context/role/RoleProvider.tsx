import React, { useState } from 'react';
import RoleContext, { RoleContextType } from './roleContext';

interface RoleProviderProps {
  children: React.ReactNode;
}

const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  const [role, setRole] = useState<string[]>([]);

  const provideRole = (role: string[]): void => {
    setRole(role);
  }

  const contextValue: RoleContextType = {
    role,
    provideRole
  };

  return (
    <RoleContext.Provider value={contextValue}>
      {children}
    </RoleContext.Provider>
  );
};

export default RoleProvider;
