"use client";
import { deletePost } from "@/actions/posts/deletePost";
import toggleFavouritePost from "@/actions/posts/toggleFavouritePost";
import { loadPosts } from "@/store/posts.store.";
import { PostWithUser } from "@/types/post";
import {
  addToast,
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  useDisclosure,
} from "@heroui/react";
import { ExternalLink, Heart, MessageSquare, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import CommentsModal from "./modals/comments.modal";

const UserPost = ({ post }: { post: PostWithUser }) => {
  const { data: session } = useSession();
  console.log(session);

  if (!session?.user.id) return <p>Loading</p>;

  const likedByUser = post.likedBy.some(
    (like) => like.userId === session.user.id
  );

  const [heart, setHeart] = useState(likedByUser);
  const [heartCount, setHeartCount] = useState(post.likedBy.length);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [commentsList, setCommentsList] = useState(post.comments);

  const toggleHeart = async () => {
    if (!post.id || !session?.user.id) return;

    const newHeart = !heart;
    setHeart(newHeart);
    setHeartCount(newHeart ? heartCount + 1 : heartCount - 1);

    try {
      await toggleFavouritePost(post.id, newHeart, session.user.id);
    } catch (err) {
      // if error
      setHeart(!newHeart);
      setHeartCount(newHeart ? heartCount - 1 : heartCount + 1);
      addToast({
        title: "Something was wrong",
        color: "danger",
      });
      console.error(err);
    }
  };
  return (
    <Card className="mt-2">
      <CardHeader className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Avatar
            alt="avatar"
            size="sm"
            radius="md"
            src={post.user.image || undefined}
          />
          <h1 className="font-semibold">{post.user.name}</h1>
        </div>
        {session?.user.id === post.userId && (
          <X
            onClick={() => {
              deletePost(post.id);
              loadPosts();
            }}
            className="cursor-pointer"
          />
        )}
      </CardHeader>
      <CardBody>
        {post.images.length > 0 && (
          <div className="flex flex-col gap-2">
            {/* Большое главное изображение */}
            <div className="w-full h-[400px] overflow-hidden rounded-sm">
              <img
                alt={post.images[0].file_name}
                height={400}
                src={post.images[0].file_data}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Миниатюры снизу */}
            {post.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto mt-2">
                {post.images.slice(1).map((image) => (
                  <Image
                    key={image.id}
                    alt={image.file_name}
                    height={100}
                    width={150}
                    radius="sm"
                    src={image.file_data}
                    className="object-cover shrink-0"
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <h1 className="mt-2">{post.text}</h1>
      </CardBody>
      <CardFooter className="flex gap-3 text-gray-600">
        <div className="flex gap-1 cursor-pointer" onClick={toggleHeart}>
          <Heart
            className={`h-6 w-6 transition-colors ${
              heart ? "text-red-500 fill-red-500" : ""
            }`}
          />
          <p>{heartCount}</p>
        </div>
        <div onClick={onOpen} className="flex gap-1 cursor-pointer">
          <MessageSquare />
          <p>{commentsList.length}</p>
        </div>
        <div className="flex gap-1 cursor-pointer">
          <ExternalLink />
          <p>1</p>
        </div>
      </CardFooter>
      <CommentsModal
        onClose={onClose}
        isOpen={isOpen}
        postId={post.id}
        comments={commentsList}
        setComments={setCommentsList}
      />
    </Card>
  );
};

export default UserPost;
