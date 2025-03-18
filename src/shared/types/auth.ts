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
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean
}
