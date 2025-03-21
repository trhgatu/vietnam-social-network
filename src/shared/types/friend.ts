import { Track } from "@/shared/types/track";

export interface Friend {
  _id: string;
  name: string;
  username: string;
  nickname?: string;
  email: string;
  avatar?: string;
  coverPhoto?: string;
  bio?: string;
  location?: string;
  status: string;
  website?: string;
  role: "user" | "admin";
  favoriteSong: Track;
  friendsCount: number;
  isOnline: boolean,
}
