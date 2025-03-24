import { Friend } from "@/shared/types/friend";
import { friendService } from "@/shared/services/friend-services";

export async function getFriends(username: string): Promise<Friend[]> {
    try {
        const friends = await friendService.getFriends({username});
        return friends;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách bạn bè:", error);
        return [];
    }
}