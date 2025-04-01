import instance from '@/api-client/axios-client';
import { Post, CreatePostPayload, UpdatePostPayload } from '@/shared/types';

class PostService {
    private baseUrl = '/posts';

    async getPosts(params?: { page?: number; limit?: number }): Promise<Post[]> {
        try {
            const response = await instance.get(`${this.baseUrl}`, { params });
            return response.data.data;
        } catch (error) {
            console.error('Error fetching posts:', error);
            return [];
        }
    }

    async getPostByUsername(username: string, params?: { page?: number; limit?: number }): Promise<Post[]> {
        try {
            const response = await instance.get(`${this.baseUrl}/user/${username}`, { params });
            return response.data.data;
        } catch (error) {
            console.error('Error fetching posts by username:', error);
            return [];
        }
    }
    async getPostById(postId: string): Promise<Post | null> {
        try {
            const response = await instance.get(`${this.baseUrl}/${postId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching post by ID:', error);
            return null;
        }
    }

    async createPost(payload: CreatePostPayload): Promise<Post | null> {
        try {
            const response = await instance.post(`${this.baseUrl}/create`, payload);
            return response.data;
        } catch (error) {
            console.error('Error creating post:', error);
            return null;
        }
    }

    async updatePost(postId: string, payload: UpdatePostPayload): Promise<Post | null> {
        try {
            const response = await instance.put(`${this.baseUrl}/${postId}`, payload);
            return response.data;
        } catch (error) {
            console.error('Error updating post:', error);
            return null;
        }
    }

    async deletePost(postId: string): Promise<boolean> {
        try {
            await instance.delete(`${this.baseUrl}/${postId}`);
            return true;
        } catch (error) {
            console.error('Error deleting post:', error);
            return false;
        }
    }

    async likePost(postId: string): Promise<boolean> {
        try {
            await instance.post(`${this.baseUrl}/${postId}/like`);
            return true;
        } catch (error) {
            console.error('Error liking post:', error);
            return false;
        }
    }

    async unlikePost(postId: string): Promise<boolean> {
        try {
            await instance.post(`${this.baseUrl}/${postId}/unlike`);
            return true;
        } catch (error) {
            console.error('Error unliking post:', error);
            return false;
        }
    }
}

export const postService = new PostService();