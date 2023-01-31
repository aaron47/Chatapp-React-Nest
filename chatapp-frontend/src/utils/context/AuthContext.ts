import { createContext } from 'react';
import { User } from '../types/User';

type AuthContextType = {
  user?: User;
  updateAuthUser: (user: User) => void;
};

export const AuthContext = createContext<AuthContextType>({
  updateAuthUser: () => {},
});
