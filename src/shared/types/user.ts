export interface User {
    id: string;
    name: string;
    username: string;
    nickname?:string;
    email: string;
    avatar?: string;
    coverPhoto?: string;
    bio?: string;
    location?: string;
    website?: string;
  }
