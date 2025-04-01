import { User } from "@/shared/types/user";

export type Post = {
    _id: string;
    content: string;
    authorId?: User;
    media?: string[];
    createdAt: string;
    isAI: boolean;
    location?: string;
    image?: string;
    likes?: string[];
    comments?: string[];
    tags?: string[];
    feelings?: string[];
    status: "public" | "private" | "friends";
    updatedAt?: string;
    shares: string[];
    isLiked?: boolean;
    isSaved?: boolean;
};

export type CreatePostPayload = {
    content: string;
    media?: string[];
    tags?: string[];
    status: "public" | "private" | "friends";
    location?: string;
    feeling?: string;
}

export type UpdatePostPayload = {
    content?: string;
    media?: string[];
    tags?: string[];
    status?: "public" | "private" | "friends";
    location?: string;
    feeling?: string;
    isAI?: boolean;
}