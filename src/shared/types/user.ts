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
}

export interface FriendRequest {
  _id: string;
  fromUser: User | string;
  toUser: User | string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}