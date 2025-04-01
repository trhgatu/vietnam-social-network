import { User } from "@/shared/types/user";

export type Post = {
    _id: string;
    content: string;
    authorId?: User;
    media?: string[];
    createdAt: string;
    isAI: boolean;
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