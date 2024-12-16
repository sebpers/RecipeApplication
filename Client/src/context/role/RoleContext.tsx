import { createContext } from 'react';

export interface RoleContextType {
  role: string[];
  provideRole: (role: string[]) => void
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export default RoleContext;