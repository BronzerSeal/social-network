"use client";
import { getAverageColor, getLightenColor } from "@/hooks/getColorsByImg";
import { Avatar, useDisclosure } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import NewUserInfo from "../modals/newUserAvatar.modal";
import NewUserAvatar from "../modals/newUserAvatar.modal";

const ProfileHeader = () => {
  const { data: session } = useSession();
  const [color, setColor] = useState("136,136,136"); // fallback
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!session?.user?.image) return;
    getAverageColor(session.user.image)
      .then(setColor)
      .catch(() => {
        setColor("rgb(136,136,136)"); // fallback
      });
  }, [session?.user?.image]);

  const lighter = getLightenColor(color, 0.55);

  return (
    <div
      className="w-full h-80 flex items-end transition-all duration-500 rounded-2xl border border-gray-200 shadow-xl overflow-hidden"
      style={{
        background: `
            radial-gradient(120% 80% at 0% 100%, rgba(0,0,0,0.35), transparent),
            linear-gradient(to top right, ${color}, ${lighter})
        `,
      }}
    >
      <div className="bg-white/90 backdrop-blur-sm w-full py-3 px-6 flex rounded-t-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.15)]">
        <div className="relative w-32 h-32 -mt-16 z-10">
          <Avatar
            src={session?.user.image || undefined}
            isBordered
            classNames={{
              base: "w-32 h-32 ring-1 ring-white shadow-2xl shadow-black/30",
            }}
          />
          <button
            onClick={() => onOpen()}
            className={`absolute bottom-0 right-0 w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white hover:bg-blue-600 transition`}
          >
            +
          </button>
        </div>

        <div className="flex flex-col justify-center text-left ml-4">
          <h1 className="font-bold text-2xl drop-shadow-sm">
            {session?.user.name}
          </h1>
          <p className="text-[14px] text-gray-500">Something about you</p>
        </div>
      </div>
      <NewUserAvatar isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default ProfileHeader;
