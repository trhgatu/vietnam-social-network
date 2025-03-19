export interface User {
    _id: string;
    name: string;
    username: string;
    nickname?:string;
    email: string;
    avatar?: string;
    coverPhoto?: string;
    bio?: string;
    location?: string;
    website?: string;
    role: "user" | "admin";
    favoriteSong : string;
  }
