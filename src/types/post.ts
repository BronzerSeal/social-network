export interface User {
  id: string;
  name: string | null;
  password: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  provider: "google" | "credentials";
}

interface images {
  id: string;
  post_id: string;
  file_name: string;
  file_data: string;
}

interface Like {
  id: string;
  postId: string;
  userId: string;
}

interface Hashtag {
  content: string;
  id: string;
}

export interface CommentProps {
  createdAt: Date;
  id: string;
  postId: string;
  text: string;
  updatedAt: Date;
  userId: string;
  user: User;
}

export interface Post {
  id: string;
  text: string;
  userId: string;
  images: images[];
  sentTimes: number;
}

export interface PostWithUser extends Post {
  user: User;
  likedBy: Like[];
  comments: CommentProps[];
  sentTimes: number;
}

export interface PostWithUserHashtag extends PostWithUser {
  hashtags: Hashtag[];
}

//infinity
export type Cursor = { createdAt: Date; id: string } | null | undefined;

export type InfinityPostsResponse = {
  posts: PostWithUserHashtag[];
  nextCursor: { createdAt: Date; id: string } | null;
  success: boolean;
  error?: string;
};
