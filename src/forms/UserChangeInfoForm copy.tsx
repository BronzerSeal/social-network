"use client";
import { loadUser, loadUserPosts } from "@/store/userPosts.store";
import { Button, Input } from "@heroui/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";

interface IProps {
  onClose: () => void;
}

const UserChangeInfoForm = ({ onClose }: IProps) => {
  const { data: session, update } = useSession();

  if (!session?.user.name) return <p>Loading</p>;

  const [handleFormdata, setHandleFormData] = useState({
    name: session?.user.name,
    dopInfo: session?.user.dopInfo || "",
  });

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setHandleFormData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!session?.user.id) return;
    const formData = new FormData();

    formData.append("variant", "userInfo");
    formData.append("name", handleFormdata.name);
    formData.append("dopInfo", handleFormdata.dopInfo);
    formData.append("userId", session?.user.id);

    try {
      const res = await axios.post("/api/userChange", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const newUserName = res.data.updatedUser.name;
      const newUserDopInfo = res.data.updatedUser.dopInfo;
      if (newUserName || newUserDopInfo) {
        // обновляем session на клиенте
        await update({ name: newUserName, dopInfo: newUserDopInfo });
        loadUser(session?.user.id);
        loadUserPosts(session?.user.id);
      }
      onClose();
    } catch (error) {}
  };

  return (
    <div>
      <Input
        name="name"
        label="username"
        value={handleFormdata.name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
        className="mb-2"
      />
      <Input
        label="dop info"
        name="dopInfo"
        value={handleFormdata.dopInfo}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
      />
      <Button color="primary" className="mt-2" onPress={handleSubmit}>
        Send
      </Button>
    </div>
  );
};

export default UserChangeInfoForm;
