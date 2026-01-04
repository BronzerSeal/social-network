"use client";
import NewPhotoComponent from "@/components/common/newPhotoComponent";
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
  console.log("USEFUL session:", session);

  const handleSubmit = async () => {
    if (!session?.user.id) return;
    const formData = new FormData();

    formData.append("userAvatar", file[0]);
    formData.append("variant", "avatar");
    formData.append("userId", session?.user.id);

    console.log(formData);

    try {
      const res = await axios.post("/api/userChange", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Получаем новый URL аватара из ответа
      const newAvatarUrl = res.data.updatedUser.image;
      console.log(newAvatarUrl);
      if (newAvatarUrl) {
        // обновляем session на клиенте
        await update({ image: newAvatarUrl });
      }
      console.log("UPDATED SESSION", session);
      onClose();
      console.log(res);
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
