"use client";
import UserPostSkeleton from "@/components/skeletons/UserPostSkeleton";
import NewPostModal from "@/components/ui/modals/newPost.modal";
import UserPost from "@/components/ui/userPost";
import { useFeedPagePosts } from "@/hooks/useFeedPagePosts";
import { Button, useDisclosure } from "@heroui/react";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";

const FeedPage = () => {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { posts, isLoading, cursor } = useFeedPagePosts();

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

          {isLoading ? (
            <UserPostSkeleton />
          ) : (
            !!posts &&
            posts.map((post) => <UserPost key={post.id} post={post} />)
          )}
        </div>
        {cursor}
      </div>
      <NewPostModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default FeedPage;
