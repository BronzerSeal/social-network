"use client";
import NewPhotoComponent from "@/components/common/newPhotoComponent";
import { loadUser, loadUserPosts } from "@/store/userPosts.store";
import { Button } from "@heroui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface IProps {
  onClose: () => void;
}

const UserChangeAvatarForm = ({ onClose }: IProps) => {
  const [file, setFile] = useState<File[]>([]);
  const { data: session, update } = useSession();

  const handleSubmit = async () => {
    if (!session?.user.id) return;
    const formData = new FormData();

    formData.append("userAvatar", file[0]);
    formData.append("variant", "avatar");
    formData.append("userId", session?.user.id);

    try {
      const res = await axios.post("/api/userChange", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const newAvatarUrl = res.data.updatedUser.image;
      if (newAvatarUrl) {
        // обновляем session на клиенте
        await update({ image: newAvatarUrl });
        loadUser(session?.user.id);
        loadUserPosts(session?.user.id);
      }
      onClose();
    } catch (error) {}
  };

  return (
    <div>
      <NewPhotoComponent onFilesChange={setFile} maxFiles={1} />
      <Button color="primary" className="mt-2" onPress={handleSubmit}>
        Send
      </Button>
    </div>
  );
};

export default UserChangeAvatarForm;
