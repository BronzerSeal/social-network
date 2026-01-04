"use client";
import ProfileHeader from "@/components/ui/userProfile/profileHeader";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <div className="py-2">
      <ProfileHeader />
    </div>
  );
};

export default page;
