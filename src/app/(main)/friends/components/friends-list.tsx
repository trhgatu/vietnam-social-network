import { Search, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function FriendsList() {
  const friends = [
    { id: 1, name: "Nguyễn Văn A", avatar: "/assets/user1.jpg", status: "online" },
    { id: 2, name: "Trần Thị B", avatar: "/assets/user2.jpg", status: "offline" },
    { id: 3, name: "Lê Văn C", avatar: "/assets/user3.jpg", status: "online" },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Tìm kiếm bạn bè..."
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-4">
        {friends.map((friend) => (
          <div key={friend.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={friend.avatar} />
                <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{friend.name}</p>
                <p className={`text-sm ${friend.status === "online" ? "text-green-500" : "text-gray-400"}`}>
                  {friend.status === "online" ? "Đang hoạt động" : "Ngoại tuyến"}
                </p>
              </div>
            </div>
            <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
