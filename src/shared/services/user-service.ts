import { ApiService } from './api-service';
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

class UserService extends ApiService<User> {
  constructor() {
    super('/users');
  }

  async getUserByUsername(username: string): Promise<User | null> {
    try {
      const result = await this.customRequest<User>('get', `/${username}`);
      return result;
    } catch (error) {
      console.error(`Error fetching user by username ${username}:`, error);
      return null;
    }
  }

  async updateProfile(userId: string, data: UserProfileUpdateData): Promise<User | null> {
    try {
      const result = await this.update(userId, data);
      return result;
    } catch (error) {
      console.error('Error updating profile:', error);
      return null;
    }
  }

  async updateAvatar(userId: string, file: File): Promise<User | null> {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch(`${this.baseUrl}/${userId}/avatar`, {
        method: 'PUT',
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to update avatar');
      }

      return response.json();
    } catch (error) {
      console.error('Error updating avatar:', error);
      return null;
    }
  }

  async updateCoverPhoto(userId: string, file: File): Promise<User | null> {
    try {
      const formData = new FormData();
      formData.append('coverPhoto', file);

      const response = await fetch(`${this.baseUrl}/${userId}/cover-photo`, {
        method: 'PUT',
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to update cover photo');
      }

      return response.json();
    } catch (error) {
      console.error('Error updating cover photo:', error);
      return null;
    }
  }

  async changePassword(userId: string, data: PasswordChangeData): Promise<{ success: boolean; message: string }> {
    try {
      const result = await this.customRequest<{ success: boolean; message: string }>(
        'put',
        `/${userId}/password`,
        data
      );
      return result;
    } catch (error) {
      console.error('Error changing password:', error);
      return { success: false, message: 'Failed to change password' };
    }
  }

  async searchUsers(params: UserSearchParams): Promise<User[]> {
    try {
      const result = await this.customRequest<User[]>('get', '/search', null, params as Record<string, unknown>);
      return result;
    } catch (error) {
      console.error('Error searching users:', error);
      return [];
    }
  }

  async getSuggestedUsers(limit = 10): Promise<User[]> {
    try {
      const result = await this.customRequest<User[]>('get', '/suggested', null, { limit });
      return result;
    } catch (error) {
      console.error('Error getting suggested users:', error);
      return [];
    }
  }
}

export const userService = new UserService();