"use client";
import getUserById from "@/actions/getUserById";
import NewPostModal from "@/components/ui/modals/newPost.modal";
import UserPost from "@/components/ui/userPost";
import ProfileHeader from "@/components/ui/userProfile/profileHeader";
import {
  loadUser,
  loadUserPosts,
  useProfileUser,
  useProfileUserError,
  useUserPostIsLoading,
  useUserPosts,
} from "@/store/userPosts.store";
import { Button, Chip, useDisclosure } from "@heroui/react";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const UserPage = () => {
  const { userId } = useParams() as { userId: string };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const posts = useUserPosts();
  const postsLoading = useUserPostIsLoading();

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
          <ProfileHeader pageUser={pageUser} />
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
            <p>Loading posts</p>
          ) : posts.length > 0 ? (
            posts.map((post) => <UserPost key={post.id} post={post} />)
          ) : (
            <p>Create your first post</p>
          )}

          <NewPostModal isOpen={isOpen} onClose={onClose} />
        </>
      )}
    </div>
  );
};

export default UserPage;
