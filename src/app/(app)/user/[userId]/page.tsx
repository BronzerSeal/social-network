"use client";
import ProfileHeaderSkeleton from "@/components/skeletons/ProfileHeaderSkeleton";
import FriendsSection from "@/components/ui/friendsSection";
import UserPageTab from "@/components/ui/userPageTab";
import ProfileHeader from "@/components/ui/userProfile/profileHeader";
import {
  loadUser,
  loadUserPosts,
  useProfileUser,
  useProfileUserError,
  useUserProfileIsLoading,
} from "@/store/userPosts.store";
import { Chip } from "@heroui/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const UserPage = () => {
  const { userId } = useParams() as { userId: string };
  const userLoading = useUserProfileIsLoading();

  const pageUser = useProfileUser();
  const error = useProfileUserError();
  useEffect(() => {
    if (userId) {
      loadUser(userId);
      loadUserPosts(userId);
    }
  }, [userId]);

  return (
    <div className="py-2">
      {error.length > 0 ? (
        <Chip className="w-full text-2xl" size="lg" radius="sm" color="danger">
          {error}
        </Chip>
      ) : (
        <>
          {!userLoading ? (
            <ProfileHeader pageUser={pageUser} />
          ) : (
            <ProfileHeaderSkeleton />
          )}
          <FriendsSection
            subscriptions={pageUser?.subscriptions}
            pageUserId={pageUser?.id}
          />
          <UserPageTab userId={userId} pageUserId={pageUser?.id} />
        </>
      )}
    </div>
  );
};

export default UserPage;
