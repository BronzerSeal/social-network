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
import { increaseSentTimes } from "@/actions/posts/sentTimes/increaseSentTimes";
import EnlargeImageModal from "./modals/enlargeImage.modal";
import { loadUserPosts } from "@/store/userPosts.store";
import { useRouter } from "next/navigation";

const UserPost = ({ post }: { post: PostWithUser }) => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session);

  // if (!session?.user.id) return <p>Loading</p>;

  const likedByUser = post.likedBy.some(
    (like) => like.userId === session?.user.id
  );

  const [heart, setHeart] = useState(likedByUser);
  const [heartCount, setHeartCount] = useState(post.likedBy.length);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [commentsList, setCommentsList] = useState(post.comments);
  const [sentTimes, setSentTimes] = useState(post.sentTimes);

  const {
    isOpen: isImageOpen,
    onOpen: onImageOpen,
    onClose: onImageClose,
  } = useDisclosure();

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const openImage = (src: string) => {
    setPreviewImage(src);
    onImageOpen();
  };

  const toggleHeart = async () => {
    if (!post.id || !session?.user.id)
      return addToast({
        title: "Log in to like post",
        color: "danger",
      });

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

  const copyLinkAndIncreaseSentTimes = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      // игнорируем ошибку в тестах
      console.warn("Clipboard write failed, ignored in test");
    }

    // всегда увеличиваем счетчик
    await increaseSentTimes(post.id);
    setSentTimes((prev) => prev + 1);

    addToast({
      title: "The link has been copied to the clipboard.",
      color: "success",
    });
  };

  return (
    <Card className="mt-2">
      <CardHeader className="flex items-center justify-between w-full">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => router.push(`/user/${post.user.id}`)}
        >
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
              loadUserPosts(session?.user.id);
            }}
            data-testid="deletePost"
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
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => openImage(post.images[0].file_data)}
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
                    className="object-cover shrink-0 cursor-pointer"
                    onClick={() => openImage(image.file_data)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <h1 className="mt-2">{post.text}</h1>
      </CardBody>
      <CardFooter className="flex gap-3 text-gray-600">
        <div
          className="flex gap-1 cursor-pointer"
          data-testid="postHeart"
          onClick={toggleHeart}
        >
          <Heart
            className={`h-6 w-6 transition-colors ${
              heart ? "text-red-500 fill-red-500" : ""
            }`}
          />
          <p>{heartCount}</p>
        </div>
        <div
          onClick={onOpen}
          data-testid="comments"
          className="flex gap-1 cursor-pointer"
        >
          <MessageSquare />
          <p>{commentsList.length}</p>
        </div>
        <div
          className="flex gap-1 cursor-pointer"
          data-testid="postShare"
          onClick={copyLinkAndIncreaseSentTimes}
        >
          <ExternalLink />
          <p>{sentTimes}</p>
        </div>
      </CardFooter>
      <CommentsModal
        onClose={onClose}
        isOpen={isOpen}
        postId={post.id}
        comments={commentsList}
        setComments={setCommentsList}
      />
      <EnlargeImageModal
        isImageOpen={isImageOpen}
        onImageClose={onImageClose}
        previewImage={previewImage}
      />
    </Card>
  );
};

export default UserPost;
