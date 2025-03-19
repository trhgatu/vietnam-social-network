'use client'
import { Search, MessageSquare, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function FriendsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const friends = [
    { id: 1, name: "Nguyễn Văn A", avatar: "/assets/user1.jpg", status: "online" },
    { id: 2, name: "Trần Thị B", avatar: "/assets/user2.jpg", status: "offline" },
    { id: 3, name: "Lê Văn C", avatar: "/assets/user3.jpg", status: "online" },
    { id: 4, name: "Phạm Thị D", avatar: "/assets/user4.jpg", status: "offline" },
    { id: 5, name: "Hoàng Văn E", avatar: "/assets/user5.jpg", status: "online" },
    { id: 6, name: "Ngô Thị F", avatar: "/assets/user6.jpg", status: "online" },
  ];

  const filteredFriends = friends.filter(friend => {
    const matchesSearch = friend.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === null || friend.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <Card className="shadow-sm h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span>Danh sách bạn bè</span>
          <Badge variant="outline" className="font-normal">
            {friends.length} người
          </Badge>
        </CardTitle>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm bạn bè..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === null ? "default" : "outline"}
              size="sm"
              className="flex-1 sm:flex-none"
              onClick={() => setFilterStatus(null)}
            >
              Tất cả
            </Button>
            <Button
              variant={filterStatus === "online" ? "default" : "outline"}
              size="sm"
              className="flex-1 sm:flex-none"
              onClick={() => setFilterStatus("online")}
            >
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                Đang hoạt động
              </span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filteredFriends.length > 0 ? (
            filteredFriends.map((friend) => (
              <div key={friend.id} className="flex flex-wrap items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage src={friend.avatar} />
                    <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{friend.name}</p>
                    <div className="flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${friend.status === "online" ? "bg-green-500" : "bg-gray-300"}`}></span>
                      <p className="text-xs text-muted-foreground">
                        {friend.status === "online" ? "Đang hoạt động" : "Ngoại tuyến"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto justify-end">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              Không tìm thấy bạn bè nào phù hợp
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
