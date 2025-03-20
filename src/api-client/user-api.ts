import { User } from "@/shared/types/user";
import { userService } from "@/shared/services/user-service";

export async function fetchUserByUsername(username: string): Promise<User | null> {
  try {
    const user = await userService.getUserByUsername(username);
    return user;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin user:", error);
    return null;
  }
}

export async function updateUserProfile(userId: string, data: Partial<User>): Promise<User | null> {
  try {
    const user = await userService.updateProfile(userId, data);
    return user;
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin user:", error);
    return null;
  }
}

export async function updateUserAvatar(userId: string, file: File): Promise<User | null> {
  try {
    const user = await userService.updateAvatar(userId, file);
    return user;
  } catch (error) {
    console.error("Lỗi khi cập nhật ảnh đại diện:", error);
    return null;
  }
}

export async function updateUserCoverPhoto(userId: string, file: File): Promise<User | null> {
  try {
    const user = await userService.updateCoverPhoto(userId, file);
    return user;
  } catch (error) {
    console.error("Lỗi khi cập nhật ảnh bìa:", error);
    return null;
  }
}

export async function searchUsers(query: string, limit = 10, page = 1): Promise<User[]> {
  try {
    const users = await userService.searchUsers({ query, limit, page });
    return users;
  } catch (error) {
    console.error("Lỗi khi tìm kiếm user:", error);
    return [];
  }
}

export async function getSuggestedUsers(limit = 5): Promise<User[]> {
  try {
    const users = await userService.getSuggestedUsers(limit);
    return users;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đề xuất:", error);
    return [];
  }
}