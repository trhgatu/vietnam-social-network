import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@/shared/contexts/auth-context';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    // Khởi tạo kết nối Socket.IO
    socketRef.current = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000', {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Xử lý sự kiện kết nối
    socketRef.current.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    // Xử lý sự kiện ngắt kết nối
    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    // Xử lý sự kiện lỗi
    socketRef.current.on('error', (error: Error) => {
      console.error('Socket.IO error:', error);
    });

    // Cleanup khi component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [token]);

  return socketRef.current;
};