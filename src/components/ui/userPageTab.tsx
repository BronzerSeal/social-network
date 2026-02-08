"use client";
import { Tabs, Tab, Button, useDisclosure } from "@heroui/react";
import { Plus } from "lucide-react";
import UserPostSkeleton from "../skeletons/UserPostSkeleton";
import UserPost from "./userPost";
import { useSession } from "next-auth/react";
import { useUserPagePosts } from "@/hooks/userPage/useUserPagePosts";
import NewPostModal from "./modals/newPost.modal";
import { useUserPageLikedPosts } from "@/hooks/userPage/useUserPageLikedPosts";

const UserPageTab = ({
  userId,
  pageUserId,
}: {
  userId: string;
  pageUserId: string | undefined;
}) => {
  const { data: session } = useSession();
  const {
    posts,
    isLoading: postsLoading,
    cursor: postsCursor,
  } = useUserPagePosts(userId);
  const {
    posts: likedPosts,
    isLoading: likedPostsLoading,
    cursor: likedPostsCursor,
  } = useUserPageLikedPosts(userId);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tabs
        aria-label="Profile tabs"
        variant="underlined"
        className="w-full"
        classNames={{
          tabList: "w-full flex justify-center gap-12",
          tab: `
      px-10
      py-4
      text-lg
      text-gray-400
      data-[hover=true]:text-gray-600
      data-[selected=true]:text-blue-500
    `,
          cursor: "bg-blue-500 h-[2px] w-1/2",
        }}
      >
        <Tab key="posts" title="posts">
          {session?.user.id === pageUserId && (
            <Button
              className="w-full"
              variant="shadow"
              color="primary"
              startContent={<Plus />}
              onPress={onOpen}
            >
              Create new post
            </Button>
          )}
          {postsLoading ? (
            <UserPostSkeleton />
          ) : !!posts ? (
            posts?.map((post) => <UserPost key={post.id} post={post} />)
          ) : (
            <p>Create your first post</p>
          )}

          {postsCursor}
        </Tab>
        <Tab key="likes" title="likes">
          {likedPostsLoading ? (
            <UserPostSkeleton />
          ) : !!likedPosts ? (
            likedPosts?.map((post) => <UserPost key={post.id} post={post} />)
          ) : (
            <p>Create your first post</p>
          )}

          {likedPostsCursor}
        </Tab>
      </Tabs>

      <NewPostModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default UserPageTab;
