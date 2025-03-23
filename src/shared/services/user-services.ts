import instance from '@/api-client/axios-client';
import { User } from '@/shared/types/user';

interface UserProfileUpdateData {
  name?: string;
  bio?: string;
  location?: string;
  website?: string;
  birthdate?: string;
  gender?: 'male' | 'female' | 'other';
  phone?: string;
}

interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface UserSearchParams {
  query?: string;
  limit?: number;
  page?: number;
}

class UserService {
  private baseUrl = '/users';

  async getUserByUsername(username: string): Promise<User | null> {
    try {
      const response = await instance.get(`${this.baseUrl}/${username}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user by username ${username}:`, error);
      return null;
    }
  }

  async updateProfile(userId: string, data: UserProfileUpdateData): Promise<User | null> {
    try {
      const response = await instance.put(`${this.baseUrl}/${userId}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      return null;
    }
  }

  async updateAvatar(userId: string, file: File): Promise<User | null> {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await instance.put(`${this.baseUrl}/${userId}/avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating avatar:', error);
      return null;
    }
  }

  async updateCoverPhoto(userId: string, file: File): Promise<User | null> {
    try {
      const formData = new FormData();
      formData.append('coverPhoto', file);

      const response = await instance.put(`${this.baseUrl}/${userId}/cover-photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating cover photo:', error);
      return null;
    }
  }

  async changePassword(userId: string, data: PasswordChangeData): Promise<{ success: boolean; message: string }> {
    try {
      const response = await instance.put(`${this.baseUrl}/${userId}/password`, data);
      return response.data;
    } catch (error) {
      console.error('Error changing password:', error);
      return { success: false, message: 'Failed to change password' };
    }
  }

  async searchUsers(params: UserSearchParams): Promise<User[]> {
    try {
      const response = await instance.get(`${this.baseUrl}/search`, { params });
      return response.data;
    } catch (error) {
      console.error('Error searching users:', error);
      return [];
    }
  }

  async getSuggestedUsers(limit = 10): Promise<User[]> {
    try {
      const response = await instance.get(`${this.baseUrl}/suggested`, { params: { limit } });
      return response.data;
    } catch (error) {
      console.error('Error getting suggested users:', error);
      return [];
    }
  }
}

export const userService = new UserService();