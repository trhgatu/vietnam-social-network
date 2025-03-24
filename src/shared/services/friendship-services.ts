import instance from '@/api-client/axios-client';
import { User } from '@/shared/types/user';
import { Friendship } from '@/shared/types/friendship';

interface SendFriendRequestData {
    recipientId: string;
}

interface AcceptFriendRequestData {
    requestId: string;
}

interface RejectOrRemoveFriendRequestData {
    requestId: string;
}

class FriendshipService {
    private baseUrl = '/friendships';

    async sendFriendRequest(data: SendFriendRequestData): Promise<{ success: boolean; message: string }> {
        try {
            const response = await instance.post(`${this.baseUrl}/send`, data);
            return response.data;
        } catch (error) {
            console.error('Error sending friend request:', error);
            return { success: false, message: 'Failed to send friend request' };
        }
    }
    async acceptFriendRequest(data: AcceptFriendRequestData): Promise<{ success: boolean; message: string }> {
        try {
            const response = await instance.post(`${this.baseUrl}/accept`, data);
            return response.data;
        } catch (error) {
            console.error('Error accepting friend request:', error);
            return { success: false, message: 'Failed to accept friend request' };
        }
    }
    async rejectOrRemoveFriend(data: RejectOrRemoveFriendRequestData): Promise<{ success: boolean; message: string }> {
        try {
            const response = await instance.post(`${this.baseUrl}/reject-or-remove`, data);
            return response.data;
        } catch (error) {
            console.error('Error rejecting or removing friend:', error);
            return { success: false, message: 'Failed to reject or remove friend' };
        }
    }



    async getReceivedFriendRequests(): Promise<Friendship[]> {
        try {
            const response = await instance.get(`${this.baseUrl}/received-requests`);
            return response.data;
        } catch (error) {
            console.error('Error fetching received friend requests:', error);
            return [];
        }
    }

    async getSentFriendRequests(): Promise<Friendship[]> {
        try {
            const response = await instance.get(`${this.baseUrl}/sent-requests`);
            return response.data;
        } catch (error) {
            console.error('Error fetching sent friend requests:', error);
            return [];
        }
    }

    async getSuggestedFriends(limit = 10): Promise<User[]> {
        try {
            const response = await instance.get(`${this.baseUrl}/suggested`, { params: { limit } });
            return response.data;
        } catch (error) {
            console.error('Error fetching suggested friends:', error);
            return [];
        }
    }
}

export const friendshipService = new FriendshipService();
