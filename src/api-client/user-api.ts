import instance from "@/api-client/axios-client";
import {
  User

} from "@/shared/types";

export async function fetchUserByUsername(username: string) {
  try {
    const res = await instance.get<User>(`/users/${username}`);
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin user:", error);
    return null;
  }
}
