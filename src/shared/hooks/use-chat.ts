import { useEffect, useCallback } from 'react';
import { useSocket } from './use-socket';
import { useAuth } from '@/shared/contexts/auth-context';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: Date;
}

interface ChatEvent {
  chatId: string;
  message: Message;
}

export const useChat = (chatId: string) => {
  const socket = useSocket();
  const { user } = useAuth();

  // Join chat room
  useEffect(() => {
    if (socket && chatId) {
      socket.emit('join:chat', chatId);
    }
  }, [socket, chatId]);

  // Send message
  const sendMessage = useCallback((content: string) => {
    if (socket && chatId) {
      socket.emit('send:message', {
        chatId,
        message: {
          content,
          sender: user?.id,
          timestamp: new Date()
        }
      });
    }
  }, [socket, chatId, user?.id]);

  // Mark message as read
  const markAsRead = useCallback((messageId: string) => {
    if (socket && chatId) {
      socket.emit('mark:read', {
        chatId,
        messageId
      });
    }
  }, [socket, chatId]);

  // Listen for new messages
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (event: ChatEvent) => {
      // Handle new message
      console.log('New message:', event);
    };

    const handleMessageRead = (event: { chatId: string; messageId: string; reader: string }) => {
      // Handle message read
      console.log('Message read:', event);
    };

    socket.on('new:message', handleNewMessage);
    socket.on('message:read', handleMessageRead);

    return () => {
      socket.off('new:message', handleNewMessage);
      socket.off('message:read', handleMessageRead);
    };
  }, [socket]);

  return {
    sendMessage,
    markAsRead
  };
};