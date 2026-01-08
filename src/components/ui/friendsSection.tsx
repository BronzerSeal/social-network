"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Avatar, Card, CardBody, Tooltip } from "@heroui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getSubscriptionsData } from "@/actions/getSubscriptionsData";
import { useRouter } from "next/navigation";

interface user {
  id: string;
  image: string;
  name: string;
}

const FriendsSection = ({
  subscriptions,
  pageUserId,
}: {
  subscriptions: string[] | undefined;
  pageUserId: string | undefined;
}) => {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    skipSnaps: false,
  });

  const [subscriptionsData, setSubscriptionsData] = useState<[] | user[]>([]);

  useEffect(() => {
    async function getData() {
      if (!pageUserId) return;
      const response = await getSubscriptionsData(pageUserId);
      setSubscriptionsData(response);
    }

    getData(); // <-- обязательно вызываем функцию
  }, [pageUserId]); // зависимость, если pageUserId меняется
  if (!subscriptions || pageUserId === undefined) return null;
  console.log(subscriptionsData);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <Card className="mt-4 w-full container mx-auto">
      <CardBody>
        <div className="flex items-center">
          <ArrowLeft
            onClick={scrollPrev}
            className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200 mr-2"
            size={24}
          />

          <div className="overflow-hidden flex-1" ref={emblaRef}>
            <div className="flex gap-3">
              {subscriptions.length === 0 &&
                "This user is not following anyone yet."}
              {subscriptionsData.map((sub) => (
                <div
                  key={sub.id}
                  className="shrink-0 cursor-pointer"
                  onClick={() => router.push(`/user/${sub.id}`)}
                  data-testid="friendAvatar"
                >
                  <Tooltip content={sub.name}>
                    <Avatar size="lg" src={sub.image} name={sub.name} />
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>

          <ArrowRight
            onClick={scrollNext}
            className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-200 ml-2"
            size={24}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default FriendsSection;
