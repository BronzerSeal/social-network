"use client";
import NewPostModal from "@/components/ui/modals/newPost.modal";
import SideBar from "@/components/ui/SideBar";
import { Button, useDisclosure } from "@heroui/react";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";

const FeedPage = () => {
  const { data: session, status } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-[1fr_4fr] gap-6 max-w-[1024px] w-full ">
        <SideBar />
        <div className="py-2">
          <Button
            className="w-full"
            variant="shadow"
            startContent={<Plus />}
            onPress={onOpen}
          >
            Create new post
          </Button>
        </div>
      </div>
      <NewPostModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default FeedPage;
