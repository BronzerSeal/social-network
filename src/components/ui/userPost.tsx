import { PostWithUser } from "@/types/post";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@heroui/react";
import { ExternalLink, Heart, MessageSquare } from "lucide-react";

const UserPost = ({ post }: { post: PostWithUser }) => {
  return (
    <Card className="mt-2">
      <CardHeader className="flex items-center gap-2">
        <Avatar
          alt="avatar"
          size="sm"
          radius="md"
          src={post.user.image || undefined}
        />
        <h1 className="font-semibold">{post.user.name}</h1>
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
        <div className="flex gap-1 cursor-pointer">
          <Heart />
          <p>1</p>
        </div>
        <div className="flex gap-1 cursor-pointer">
          <MessageSquare />
          <p>1</p>
        </div>
        <div className="flex gap-1 cursor-pointer">
          <ExternalLink />
          <p>1</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserPost;
