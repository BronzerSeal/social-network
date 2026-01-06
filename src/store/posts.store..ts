import { getPostById } from "@/actions/posts/getPostById";
import { getPosts } from "@/actions/posts/getPosts";
import { PostWithUser } from "@/types/post";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IInitialState {
  posts: PostWithUser[];
  isLoading: boolean;
  error: string | null;
}

interface IActions {
  loadPosts: () => void;
  loadPostById: (postId: string) => void;
}

interface PostsState extends IInitialState, IActions {}

const initialState: IInitialState = {
  posts: [],
  isLoading: false,
  error: null,
};

const usePostsStore = create<PostsState>()(
  devtools((set, get) => ({
    ...initialState,
    loadPosts: async () => {
      set({ isLoading: true, error: null });

      try {
        const result = await getPosts();

        if (result.success) {
          set({ posts: result.posts, isLoading: false });
        } else {
          set({ error: result.error, isLoading: false });
        }
      } catch (error) {
        console.error("error", error);
        set({ error: "error getting posts", isLoading: false });
      }
    },
    loadPostById: async (postId: string) => {
      try {
        const result = await getPostById(postId);

        if (!result.success || !result.post) return;

        set({
          posts: get().posts.map((p) => (p.id === postId ? result.post! : p)),
        });
      } catch (e) {
        console.error(e);
      }
    },
  }))
);

export const usePosts = () => usePostsStore((state) => state.posts);
export const usePostIsLoading = () => usePostsStore((state) => state.isLoading);
export const loadPosts = () => usePostsStore.getState().loadPosts();
export const loadPostById = (postId: string) =>
  usePostsStore.getState().loadPostById(postId);
