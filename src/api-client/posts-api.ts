import { CreatePostPayload, Post, UpdatePostPayload } from "@/shared/types/post";
import { postService } from "@/shared/services/post-services";

export async function fetchPosts(page = 1, limit = 10): Promise<Post[]> {
  try {
    const posts = await postService.getPosts({ page, limit });
    return posts;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bài viết:", error);
    return [];
  }
}

export async function fetchPostsByUsername(username: string, page = 1, limit = 10): Promise<Post[]> {
  try {
    const posts = await postService.getPostByUsername(username, { page, limit });
    return posts;
  }
  catch (error) {
    console.error("Lỗi khi lấy danh sách bài viết của người dùng:", error);
    return [];
  }
}

export async function fetchPostById(postId: string): Promise<Post | null> {
  try {
    const post = await postService.getPostById(postId);
    return post;
  } catch (error) {
    console.error("Lỗi khi lấy bài viết:", error);
    return null;
  }
}

export async function createPost(data: CreatePostPayload): Promise<Post | null> {
  try {
    const post = await postService.createPost(data);
    return post;
  } catch (error) {
    console.error("Lỗi khi tạo bài viết:", error);
    return null;
  }
}

export async function updatePost(postId: string, data: UpdatePostPayload): Promise<Post | null> {
  try {
    const post = await postService.updatePost(postId, data);
    return post;
  } catch (error) {
    console.error("Lỗi khi cập nhật bài viết:", error);
    return null;
  }
}

export async function deletePost(postId: string): Promise<boolean> {
  try {
    await postService.deletePost(postId);
    return true;
  } catch (error) {
    console.error("Lỗi khi xóa bài viết:", error);
    return false;
  }
}

export async function likePost(postId: string): Promise<boolean> {
  try {
    await postService.likePost(postId);
    return true;
  } catch (error) {
    console.error("Lỗi khi thích bài viết:", error);
    return false;
  }
}

export async function unlikePost(postId: string): Promise<boolean> {
  try {
    await postService.unlikePost(postId);
    return true;
  } catch (error) {
    console.error("Lỗi khi bỏ thích bài viết:", error);
    return false;
  }
}
