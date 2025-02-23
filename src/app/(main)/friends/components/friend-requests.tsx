import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export function FriendRequests() {
    const requests = [
      { id: 1, name: "Nguyễn Văn D", avatar: "/assets/user4.jpg" },
      { id: 2, name: "Hoàng Thị E", avatar: "/assets/user5.jpg" },
    ];

    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Lời mời kết bạn</h2>
        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={req.avatar} />
                  <AvatarFallback>{req.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="font-medium">{req.name}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600">Chấp nhận</button>
                <button className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600">Từ chối</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
