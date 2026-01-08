"use client";
import { getAverageColor, getLightenColor } from "@/hooks/getColorsByImg";
import { addToast, Avatar, Button, Chip, useDisclosure } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Settings, UserRoundMinus, UserRoundPlus } from "lucide-react";
import NewUserAvatar from "../modals/newUserAvatar.modal";
import ChangeUserInfo from "../modals/changeUserInfo.modal";
import { Session } from "next-auth";
import subscribe from "@/actions/subscribe";

const ProfileHeader = ({ pageUser }: { pageUser: Session["user"] | null }) => {
  const { data: session, update } = useSession();
  const [color, setColor] = useState("136,136,136"); // fallback
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isUserInfoOpen,
    onOpen: onUserInfoOpen,
    onClose: onUserInfoClose,
  } = useDisclosure();
  const subscribed = session?.user.subscriptions.some(
    (sub) => sub === pageUser?.id
  );

  useEffect(() => {
    if (!pageUser?.image) return;
    getAverageColor(pageUser.image)
      .then(setColor)
      .catch(() => {
        setColor("rgb(147,147,137)"); // fallback
      });
  }, [pageUser?.image]);

  const lighter = getLightenColor(color, 0.55);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // триггерим анимацию после монтирования компонента
    setMounted(true);
  }, []);

  const handleSubscribe = async () => {
    if (!session?.user.id)
      return addToast({
        title: "Log in to subscribe",
        color: "danger",
      });
    if (!pageUser?.id) return;
    try {
      const updatedUser = await subscribe(session.user.id, pageUser?.id);

      if (updatedUser.code === 200) {
        await update({ subscriptions: updatedUser.updatedUser.subscriptions });
      }
    } catch (error) {
      addToast({
        title: "Something was wrong. Try again later",
        color: "danger",
      });
    }
  };

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
      <div className="bg-white/90 backdrop-blur-sm w-full py-3 px-6 flex justify-between items-center rounded-t-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.15)]">
        <div className="flex">
          <div className="relative w-32 h-32 -mt-16 z-10">
            <Avatar
              src={pageUser?.image || undefined}
              isBordered
              classNames={{
                base: `w-32 h-32 ring-1 ring-white shadow-2xl shadow-black/30 
                 transition-transform duration-500 ease-out
                 ${mounted ? "scale-100" : "scale-0"}`, // from 0 to 100%
              }}
            />
            {pageUser?.id === session?.user.id && (
              <button
                onClick={() => onOpen()}
                className={`absolute bottom-0 right-0 w-9 h-9 bg-blue-500 rounded-full cursor-pointer flex items-center justify-center text-white shadow-lg border-2 border-white hover:bg-blue-600  transition-transform duration-300 ease-in-out hover:rotate-45`}
              >
                +
              </button>
            )}
          </div>

          <div className="flex flex-col justify-center text-left ml-4">
            <h1 className="font-bold text-2xl drop-shadow-sm">
              {pageUser?.name}
              {pageUser?.proStatus && (
                <Chip color="warning" variant="shadow" className="ml-1">
                  Pro
                </Chip>
              )}
            </h1>

            <p className="text-[14px] text-gray-500">
              {pageUser?.dopInfo && pageUser?.dopInfo.length > 0
                ? pageUser?.dopInfo
                : "Something about you"}
            </p>
          </div>
        </div>
        {pageUser?.id === session?.user.id ? (
          <Button
            radius="lg"
            color="primary"
            className="h-12 cursor-pointer flex items-center justify-center group"
            onPress={() => onUserInfoOpen()}
            data-testid="settings"
          >
            <Settings className="transition-transform duration-300 ease-in-out group-hover:rotate-90" />
          </Button>
        ) : (
          <Button
            radius="lg"
            color={`${subscribed ? "default" : "primary"}`}
            className="h-12 cursor-pointer flex items-center justify-center "
            onPress={handleSubscribe}
          >
            {subscribed ? (
              <>
                <p>Unsubscribe</p>
                <UserRoundMinus />
              </>
            ) : (
              <>
                <p>Subscribe</p>
                <UserRoundPlus />
              </>
            )}
          </Button>
        )}
      </div>

      <NewUserAvatar isOpen={isOpen} onClose={onClose} />
      <ChangeUserInfo isOpen={isUserInfoOpen} onClose={onUserInfoClose} />
    </div>
  );
};

export default ProfileHeader;
