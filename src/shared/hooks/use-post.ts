/* import { useEffect, useCallback } from 'react';
import { useSocket } from './use-socket';
import { useAuth } from '@/shared/contexts/auth-context';

interface Post {
  id: string;
  content: string;
  media?: string[];
  author: string;
  createdAt: Date;
  likes: string[];
  comments: Comment[];
}

interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
}

export const usePost = () => {
  const socket = useSocket();
  const { user } = useAuth();

  // Create new post
  const createPost = useCallback((content: string, media?: string[]) => {
    if (socket && user) {
      socket.emit('create:post', {
        content,
        media,
        author: user._id,
        createdAt: new Date()
      });
    }
  }, [socket, user]);

  // Toggle like
  const toggleLike = useCallback((postId: string) => {
    if (socket && user) {
      socket.emit('toggle:like', {
        postId,
        action: 'toggle'
      });
    }
  }, [socket, user]);

  // Add comment
  const addComment = useCallback((postId: string, content: string) => {
    if (socket && user) {
      socket.emit('add:comment', {
        postId,
        comment: {
          content,
          author: user._id,
          createdAt: new Date()
        }
      });
    }
  }, [socket, user]);

  // Listen for post events
  useEffect(() => {
    if (!socket) return;

    const handleNewPost = (event: { post: Post }) => {
      // Handle new post
      console.log('New post:', event);
    };

    const handlePostLikeUpdate = (event: { postId: string; userId: string; action: string }) => {
      // Handle post like update
      console.log('Post like update:', event);
    };

    const handleNewComment = (event: { postId: string; comment: Comment }) => {
      // Handle new comment
      console.log('New comment:', event);
    };

    socket.on('new:post', handleNewPost);
    socket.on('post:like:update', handlePostLikeUpdate);
    socket.on('new:comment', handleNewComment);

    return () => {
      socket.off('new:post', handleNewPost);
      socket.off('post:like:update', handlePostLikeUpdate);
      socket.off('new:comment', handleNewComment);
    };
  }, [socket]);

  return {
    createPost,
    toggleLike,
    addComment
  };
}; */