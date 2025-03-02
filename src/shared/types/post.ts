export type Author = {
    _id: string;
    name: string;
    avatar?: string;
    username: string;
};

export type Post = {
    _id: string;
    content: string;
    authorId?: Author;
    media?: string[];
    createdAt: string;
    isAI: boolean;
};
