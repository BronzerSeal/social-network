import getUserById from "@/actions/getUserById";
import { getUserPostsById } from "@/actions/posts/getUserPostsById";
import { PostWithUser } from "@/types/post";
import { Session } from "next-auth";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IInitialState {
  user: Session["user"] | null;
  userPosts: PostWithUser[];
  isLoading: boolean;
  error: string | null;
  userError: string;
}

interface IActions {
  loadPosts: (userId: string) => void;
  loadUser: (userId: string) => Promise<void>;
}

interface PostsState extends IInitialState, IActions {}

const initialState: IInitialState = {
  userPosts: [],
  isLoading: false,
  error: null,
  userError: "",
  user: null,
};

const useUserProfileStore = create<PostsState>()(
  devtools((set) => ({
    ...initialState,
    loadUser: async (userId: string) => {
      try {
        const res = await getUserById(userId);
        if (res === null) {
          set({ userError: "Unable to find user, Try again later" });
        } else {
          set({ user: res, userError: "" });
        }
        console.log("res:", res);
      } catch {
        set({ userError: "Unable to find user, Try again later" });
      }
    },
    loadPosts: async (userId: string) => {
      set({ isLoading: true, error: null });

      try {
        const result = await getUserPostsById(userId);

        if (result.success) {
          set({ userPosts: result.posts, isLoading: false });
        } else {
          set({ error: result.error, isLoading: false });
        }
      } catch (error) {
        console.error("error", error);
        set({ error: "error getting posts", isLoading: false });
      }
    },
  }))
);

export const useProfileUser = () => useUserProfileStore((state) => state.user);
export const useProfileUserError = () =>
  useUserProfileStore((state) => state.userError);
export const useUserPosts = () =>
  useUserProfileStore((state) => state.userPosts);
export const useUserPostIsLoading = () =>
  useUserProfileStore((state) => state.isLoading);
export const loadUserPosts = (userId: string) =>
  useUserProfileStore.getState().loadPosts(userId);
export const loadUser = (userId: string) =>
  useUserProfileStore.getState().loadUser(userId);
