/* import { useEffect, useCallback } from 'react';
import { useSocket } from './use-socket';

interface Notification {
  id: string;
  type: 'friend_request' | 'post_like' | 'post_comment' | 'message';
  content: string;
  sender?: string;
  timestamp: Date;
  read: boolean;
}

export const useNotification = () => {
  const socket = useSocket();

  // Mark notification as read
  const markAsRead = useCallback((notificationId: string) => {
    if (socket) {
      socket.emit('mark:notification:read', notificationId);
    }
  }, [socket]);

  // Listen for new notifications
  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (event: { notification: Notification }) => {
      // Handle new notification
      console.log('New notification:', event);
    };

    const handleNotificationRead = (event: { notificationId: string; timestamp: Date }) => {
      // Handle notification read
      console.log('Notification read:', event);
    };

    socket.on('new:notification', handleNewNotification);
    socket.on('notification:read', handleNotificationRead);

    return () => {
      socket.off('new:notification', handleNewNotification);
      socket.off('notification:read', handleNotificationRead);
    };
  }, [socket]);

  return {
    markAsRead
  };
}; */