import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, UserCheck } from "lucide-react";

export function FriendRequests() {
  const requests = [
    { id: 1, name: "Nguyễn Văn D", avatar: "/assets/user4.jpg", mutualFriends: 5 },
    { id: 2, name: "Hoàng Thị E", avatar: "/assets/user5.jpg", mutualFriends: 2 },
    { id: 3, name: "Trần Văn F", avatar: "/assets/user6.jpg", mutualFriends: 0 },
  ];

  const sentRequests = [
    { id: 4, name: "Lê Thị G", avatar: "/assets/user7.jpg", sentAt: "2 ngày trước" },
    { id: 5, name: "Phạm Văn H", avatar: "/assets/user8.jpg", sentAt: "1 tuần trước" },
  ];

  return (
    <div className="space-y-6 h-full">
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span>Lời mời kết bạn</span>
            <Badge variant="outline" className="font-normal">
              {requests.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {requests.length > 0 ? (
              requests.map((req) => (
                <div key={req.id} className="flex flex-wrap items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3 mb-2 sm:mb-0">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src={req.avatar} />
                      <AvatarFallback>{req.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{req.name}</p>
                      {req.mutualFriends > 0 && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <UserCheck className="h-3 w-3" />
                          {req.mutualFriends} bạn chung
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto justify-end">
                    <Button variant="default" size="sm" className="h-8 flex-1 sm:flex-none">
                      <Check className="h-4 w-4 mr-1" />
                      Chấp nhận
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 flex-1 sm:flex-none">
                      <X className="h-4 w-4 mr-1" />
                      Từ chối
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-muted-foreground">
                Không có lời mời kết bạn nào
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span>Lời mời đã gửi</span>
            <Badge variant="outline" className="font-normal">
              {sentRequests.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sentRequests.length > 0 ? (
              sentRequests.map((req) => (
                <div key={req.id} className="flex flex-wrap items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3 mb-2 sm:mb-0">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src={req.avatar} />
                      <AvatarFallback>{req.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{req.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Đã gửi: {req.sentAt}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 w-full sm:w-auto">
                    Hủy
                  </Button>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-muted-foreground">
                Chưa gửi lời mời kết bạn nào
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
