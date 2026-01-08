"use client";
import UserPostSkeleton from "@/components/skeletons/UserPostSkeleton";
import NewPostModal from "@/components/ui/modals/newPost.modal";
import UserPost from "@/components/ui/userPost";
import { usePostIsLoading, usePosts } from "@/store/posts.store.";
import { Button, useDisclosure } from "@heroui/react";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";

const FeedPage = () => {
  const { data: session } = useSession();
  const posts = usePosts();
  const postsLoading = usePostIsLoading();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!session) return <p>unauthorized</p>;

  return (
    <div className="flex justify-center">
      <div className="max-w-5xl w-full ">
        <div className="py-2">
          <Button
            className="w-full"
            variant="shadow"
            startContent={<Plus />}
            onPress={onOpen}
          >
            Create new post
          </Button>

          {postsLoading ? (
            <UserPostSkeleton />
          ) : (
            posts.map((post) => <UserPost key={post.id} post={post} />)
          )}
        </div>
      </div>
      <NewPostModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default FeedPage;
