import instance from '@/api-client/axios-client';
import { Friend } from '@/shared/types/friend';

interface FriendSearchParams {
    username?: string;
    limit?: number;
    page?: number;
}

class FriendService {
    private baseUrl = '/friends';

    async getFriends(params: FriendSearchParams): Promise<Friend[]> {
        try {
            const response = await instance.get(`${this.baseUrl}`, { params });
            return response.data.data;
        } catch (error) {
            console.error('Error fetching friends:', error);
            return [];
        }
    }
}

export const friendService = new FriendService();
