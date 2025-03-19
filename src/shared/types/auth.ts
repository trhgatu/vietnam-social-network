import type { User } from "./user";

export interface AuthResponse {
  user: User;
  token?: string;
}

export interface AuthInput {
  email: string;
  password: string;
}

export interface AuthContextType {
  currentUser: User | null;
  profileUser: User | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  setProfileUser: (user: User) => void;
  loading: boolean;
}

