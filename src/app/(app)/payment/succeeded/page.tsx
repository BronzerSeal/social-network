"use client";

import { activatePro } from "@/actions/activatePro";
import { loadUser } from "@/store/userPosts.store";
import { addToast, Button } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SucceededPage = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  if (!session) return <p>Unauthorized</p>;

  const handleActivatePro = async () => {
    try {
      const response = await activatePro(session.user.id);
      if (response.code === 200) {
        update({ proStatus: response.updatedUser.proStatus });
        loadUser(session?.user.id);
      }

      router.push(`/user/${session.user.id}`);
    } catch (error) {
      addToast({
        title: "Something was wrong. Try again later",
        color: "danger",
      });
    }
  };

  return (
    <div className="flex items-center flex-col">
      <h1 className="text-3xl font-bold">Successful payment</h1>
      <h2 className="text-gray-600">
        Click the button below to activate pro status
      </h2>

      <Button
        size="lg"
        variant="shadow"
        className="mt-2"
        color="warning"
        onPress={handleActivatePro}
      >
        Activate
      </Button>
    </div>
  );
};

export default SucceededPage;
