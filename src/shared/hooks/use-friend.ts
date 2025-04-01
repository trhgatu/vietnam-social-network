/* import { useEffect, useCallback } from 'react';
import { useSocket } from './use-socket';
import { useAuth } from '@/shared/contexts/auth-context';

export const useFriend = () => {
  const socket = useSocket();
  const { user } = useAuth();

  // Send friend request
  const sendFriendRequest = useCallback((userId: string) => {
    if (socket && user) {
      socket.emit('send:friend:request', {
        userId
      });
    }
  }, [socket, user]);

  // Respond to friend request
  const respondToFriendRequest = useCallback((userId: string, action: 'accept' | 'reject') => {
    if (socket && user) {
      socket.emit('respond:friend:request', {
        userId,
        action
      });
    }
  }, [socket, user]);

  // Listen for friend events
  useEffect(() => {
    if (!socket) return;

    const handleNewFriendRequest = (event: { sender: string; timestamp: Date }) => {
      // Handle new friend request
      console.log('New friend request:', event);
    };

    const handleFriendRequestResponse = (event: { userId: string; action: string; timestamp: Date }) => {
      // Handle friend request response
      console.log('Friend request response:', event);
    };

    socket.on('new:friend:request', handleNewFriendRequest);
    socket.on('friend:request:response', handleFriendRequestResponse);

    return () => {
      socket.off('new:friend:request', handleNewFriendRequest);
      socket.off('friend:request:response', handleFriendRequestResponse);
    };
  }, [socket]);

  return {
    sendFriendRequest,
    respondToFriendRequest
  };
}; */