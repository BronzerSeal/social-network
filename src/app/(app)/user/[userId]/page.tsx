"use client";
import ProfileHeaderSkeleton from "@/components/skeletons/ProfileHeaderSkeleton";
import UserPostSkeleton from "@/components/skeletons/UserPostSkeleton";
import FriendsSection from "@/components/ui/friendsSection";
import NewPostModal from "@/components/ui/modals/newPost.modal";
import UserPost from "@/components/ui/userPost";
import ProfileHeader from "@/components/ui/userProfile/profileHeader";
import { useUserPagePosts } from "@/hooks/useUserPagePosts";
import {
  loadUser,
  loadUserPosts,
  useProfileUser,
  useProfileUserError,
  useUserProfileIsLoading,
} from "@/store/userPosts.store";
import { Button, Chip, useDisclosure } from "@heroui/react";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const UserPage = () => {
  const { userId } = useParams() as { userId: string };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { posts, isLoading: postsLoading, cursor } = useUserPagePosts(userId);
  const userLoading = useUserProfileIsLoading();

  const pageUser = useProfileUser();
  const { data: session } = useSession();
  const error = useProfileUserError();
  useEffect(() => {
    if (userId) {
      loadUser(userId);
      loadUserPosts(userId);
    }
  }, [userId]);

  return (
    <div className="py-2">
      {error.length > 0 ? (
        <Chip className="w-full text-2xl" size="lg" radius="sm" color="danger">
          {error}
        </Chip>
      ) : (
        <>
          {!userLoading ? (
            <ProfileHeader pageUser={pageUser} />
          ) : (
            <ProfileHeaderSkeleton />
          )}
          <FriendsSection
            subscriptions={pageUser?.subscriptions}
            pageUserId={pageUser?.id}
          />
          {session?.user.id === pageUser?.id && (
            <Button
              className="w-full mt-2"
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

          {cursor}
          <NewPostModal isOpen={isOpen} onClose={onClose} />
        </>
      )}
    </div>
  );
};

export default UserPage;
