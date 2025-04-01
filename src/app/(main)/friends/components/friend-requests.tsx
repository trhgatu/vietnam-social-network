'use client'

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Friendship } from '@/shared/types/friendship';
import { getReceivedFriendRequests, getSentFriendRequests, acceptFriendRequest, rejectOrRemoveFriend } from '@/api-client/friendship-api';

export function FriendRequests() {
  const [receivedRequests, setReceivedRequests] = useState<Friendship[]>([]);
  const [sentRequests, setSentRequests] = useState<Friendship[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const received = await getReceivedFriendRequests();
        const sent = await getSentFriendRequests();
        setReceivedRequests(received);
        setSentRequests(sent);
      } catch {
        setError("Lỗi khi tải lời mời kết bạn");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (requestId: string) => {
    const response = await acceptFriendRequest(requestId);
    if (response.success) {
      setReceivedRequests(receivedRequests.filter((req) => req._id !== requestId));
    } else {
      alert(response.message);
    }
  };

  const handleReject = async (requestId: string) => {
    const response = await rejectOrRemoveFriend(requestId);
    if (response.success) {
      setReceivedRequests(receivedRequests.filter((req) => req._id !== requestId));
    } else {
      alert(response.message);
    }
  };

  const handleCancelSent = async (requestId: string) => {
    const response = await rejectOrRemoveFriend(requestId);
    if (response.success) {
      setSentRequests(sentRequests.filter((req) => req._id !== requestId));
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="space-y-6 h-full">
      {loading && <div>Đang tải...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span>Lời mời kết bạn</span>
            <Badge variant="outline" className="font-normal">
              {receivedRequests.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {receivedRequests.length > 0 ? (
              receivedRequests.map((req) => (
                <div key={req._id} className="flex flex-wrap items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3 mb-2 sm:mb-0">
                    <Avatar className="h-10 w-10 border">
                      {/* Không có avatar, bạn có thể sử dụng fallback hoặc giá trị mặc định */}
                      <AvatarImage src={req.requester?.avatar || "/default-avatar.jpg"} />
                      <AvatarFallback>{(req.requester?.name || 'A').charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{req.requester.name}</p>
                      {/* {req.mutualFriends > 0 && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <UserCheck className="h-3 w-3" />
                          {req.mutualFriends} bạn chung
                        </p>
                      )} */}
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto justify-end">
                    <Button variant="default" size="sm" className="h-8 flex-1 sm:flex-none" onClick={() => handleAccept(req._id)}>
                      <Check className="h-4 w-4 mr-1" />
                      Chấp nhận
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 flex-1 sm:flex-none" onClick={() => handleReject(req._id)}>
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

      {/* Sent Friend Requests */}
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
                <div key={req._id} className="flex flex-wrap items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3 mb-2 sm:mb-0">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src={req.recipient?.avatar} />
                      <AvatarFallback>{req.recipient?.name?.charAt(0) || "?"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{req.recipient?.name || "Tên không có sẵn"}</p>
                      <p className="text-xs text-muted-foreground">
                        Đã gửi: {new Date(req.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 w-full sm:w-auto" onClick={() => handleCancelSent(req._id)}>
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
