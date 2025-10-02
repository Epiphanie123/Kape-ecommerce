import { createContext, useContext } from "react";

export interface User {
  id: string;
  fullname: string;
  email: string;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  register: (fullname: string, email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => { throw new Error("login function not implemented"); },
  logout: () => { },
  register: async () => { },
});

export const useAuth = () => useContext(AuthContext);
