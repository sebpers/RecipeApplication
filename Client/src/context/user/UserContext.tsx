import { createContext } from 'react';

export interface UserContextType {
  currentUser: any;
  userId: string;
  provideUser: (user: any) => void
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;