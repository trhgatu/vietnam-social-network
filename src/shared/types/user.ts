import { Track } from "@/shared/types/track";

export interface User {
  _id: string;
  name: string;
  username: string;
  nickname?: string;
  email: string;
  avatar?: string;
  coverPhoto?: string;
  bio?: string;
  location?: string;
  website?: string;
  role: "user" | "admin";
  favoriteSong: Track;
  friendsCount: number
  accessToken?: string;
}
export interface UserProfile {
  _id: string;
  name: string;
  username: string;
  nickname?: string;
  email: string;
  avatar?: string;
  coverPhoto?: string;
  bio?: string;
  location?: string;
  website?: string;
  role: "user" | "admin";
  friendsCount: number
}
export interface UserResponse {
  user: User;
  success: boolean;
  message: string;
}