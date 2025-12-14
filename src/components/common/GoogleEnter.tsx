import { pageUrls } from "@/configs/pageUrls.config";
import { Image } from "@heroui/react";
import { signIn } from "next-auth/react";

export default function GoogleEnter() {
  const handleGoogleSignIn = () => {
    signIn("google", {
      callbackUrl: pageUrls.feedPage,
    });
  };
  return (
    <div
      onClick={handleGoogleSignIn}
      className="flex gap-3 text-[14px] font-semibold text-gray-700 items-center cursor-pointer w-full justify-center"
    >
      <Image
        src={`https://icon2.cleanpng.com/20240216/yhs/transparent-google-logo-google-logo-with-colorful-letters-on-black-1710875297222.webp`}
        width={23}
        height={23}
      />
      <div>Enter with Google</div>
    </div>
  );
}
