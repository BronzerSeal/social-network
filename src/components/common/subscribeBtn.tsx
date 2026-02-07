import { addToast, Button } from "@heroui/react";
import { UserRoundMinus, UserRoundPlus } from "lucide-react";
import { useSession } from "next-auth/react";
import subscribe from "@/actions/subscribe";

const SubscribeBtn = ({
  isSubscribed,
  pageUserId,
  size = 12,
}: {
  isSubscribed: boolean | undefined;
  pageUserId: string | undefined;
  size?: number;
}) => {
  const { data: session, update } = useSession();

  const handleSubscribe = async () => {
    if (!session?.user.id)
      return addToast({
        title: "Log in to subscribe",
        color: "danger",
      });
    if (!pageUserId) return;
    try {
      const updatedUser = await subscribe(session.user.id, pageUserId);

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
    <Button
      radius="lg"
      color={`${isSubscribed ? "default" : "primary"}`}
      className={`h-${size} cursor-pointer flex items-center justify-center`}
      onPress={handleSubscribe}
    >
      {isSubscribed ? (
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
  );
};

export default SubscribeBtn;
