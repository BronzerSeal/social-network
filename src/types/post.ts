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

export interface Post {
  id: string;
  text: string;
  userId: string;
  images: images[];
}

export interface PostWithUser {
  id: string;
  text: string;
  userId: string;
  images: images[];
  user: User;
  likedBy: Like[];
}
