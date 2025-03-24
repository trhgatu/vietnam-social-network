import { Friendship } from "@/shared/types/friendship";
import { friendshipService } from "@/shared/services/friendship-services";

export async function sendFriendRequest(recipientId: string): Promise<{ success: boolean; message: string }> {
    try {
        const response = await friendshipService.sendFriendRequest({ recipientId });
        return response;
    } catch (error) {
        console.error("Lỗi khi gửi lời mời kết bạn:", error);
        return { success: false, message: "Không thể gửi lời mời kết bạn" };
    }
}

export async function acceptFriendRequest(requestId: string): Promise<{ success: boolean; message: string }> {
    try {
        const response = await friendshipService.acceptFriendRequest({ requestId });
        return response;
    } catch (error) {
        console.error("Lỗi khi chấp nhận lời mời kết bạn:", error);
        return { success: false, message: "Không thể chấp nhận lời mời" };
    }
}

export async function rejectOrRemoveFriend(requestId: string): Promise<{ success: boolean; message: string }> {
    try {
        const response = await friendshipService.rejectOrRemoveFriend({ requestId });
        return response;
    } catch (error) {
        console.error("Lỗi khi từ chối hoặc hủy kết bạn:", error);
        return { success: false, message: "Không thể từ chối hoặc hủy kết bạn" };
    }
}


export async function getReceivedFriendRequests(): Promise<Friendship[]> {
    try {
        const response = await friendshipService.getReceivedFriendRequests();
        return response;
    } catch (error) {
        console.error("Lỗi khi lấy lời mời kết bạn đã nhận:", error);
        return [];
    }
}

export async function getSentFriendRequests(): Promise<Friendship[]> {
    try {
        const response = await friendshipService.getSentFriendRequests();
        return response;
    } catch (error) {
        console.error("Lỗi khi lấy lời mời kết bạn đã gửi:", error);
        return [];
    }
}
