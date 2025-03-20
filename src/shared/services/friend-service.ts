import apiClient from './api-service';
import { FriendRequest, User } from '../types/user';

export class FriendService {
  private basePath = '/friends';

  async getFriends(): Promise<User[]> {
    const response = await apiClient.get(this.basePath);
    return response.data.data;
  }

  async getFriendRequests(): Promise<FriendRequest[]> {
    const response = await apiClient.get(`${this.basePath}/requests`);
    return response.data.data;
  }


  async getSentRequests(): Promise<FriendRequest[]> {
    const response = await apiClient.get(`${this.basePath}/requests/sent`);
    return response.data.data;
  }

  /**
   * Gửi lời mời kết bạn cho người dùng
   * @param userId ID người dùng cần kết bạn
   */
  async sendFriendRequest(userId: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post(`${this.basePath}/request`, { userId });
    return response.data;
  }

  /**
   * Chấp nhận lời mời kết bạn
   * @param requestId ID của lời mời kết bạn
   */
  async acceptFriendRequest(requestId: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.put(`${this.basePath}/request/${requestId}/accept`);
    return response.data;
  }

  /**
   * Từ chối lời mời kết bạn
   * @param requestId ID của lời mời kết bạn
   */
  async declineFriendRequest(requestId: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.put(`${this.basePath}/request/${requestId}/decline`);
    return response.data;
  }

  /**
   * Hủy lời mời kết bạn đã gửi
   * @param requestId ID của lời mời kết bạn
   */
  async cancelFriendRequest(requestId: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.delete(`${this.basePath}/request/${requestId}`);
    return response.data;
  }

  /**
   * Xóa bạn bè
   * @param userId ID người dùng cần xóa khỏi danh sách bạn bè
   */
  async removeFriend(userId: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.delete(`${this.basePath}/${userId}`);
    return response.data;
  }

  /**
   * Kiểm tra trạng thái kết bạn với một người dùng
   * @param userId ID người dùng cần kiểm tra
   */
  async getFriendStatus(userId: string): Promise<{ status: 'none' | 'pending' | 'requested' | 'friends' | 'self' }> {
    const response = await apiClient.get(`${this.basePath}/status/${userId}`);
    return response.data.data;
  }
}