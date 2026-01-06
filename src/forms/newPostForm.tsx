"use client";
import NewPhotoComponent from "@/components/common/newPhotoComponent";
import { Button, Textarea } from "@heroui/react";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { loadPosts } from "@/store/posts.store.";
import { loadUserPosts } from "@/store/userPosts.store";

interface IProps {
  onClose: () => void;
}

const NewPostForm = ({ onClose }: IProps) => {
  const { data: session } = useSession();
  const [text, setText] = useState("write something");
  const [files, setFiles] = useState<File[]>([]);
  console.log(files);

  const handleSubmit = async () => {
    if (!session?.user.id) return;
    const formData = new FormData();

    formData.append("text", text);
    formData.append("userId", session.user.id);

    files.forEach((file) => {
      formData.append("files", file);
    });
    console.log(formData);

    await axios.post("/api/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    loadPosts();
    loadUserPosts(session?.user.id);

    onClose();
  };

  return (
    <div>
      <NewPhotoComponent onFilesChange={setFiles} />
      <Textarea
        placeholder="write something"
        className="mt-1"
        // @ts-ignore
        variant="undefined"
        onChange={(e) => setText(e.target.value)}
        value={text}
        errorMessage="The description should be"
        isInvalid={text.length > 0 ? false : true}
      />
      <Button
        className="mt-1"
        color="primary"
        isDisabled={text.length > 0 ? false : true}
        onPress={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default NewPostForm;
