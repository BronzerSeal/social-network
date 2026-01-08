"use client";
import { sideBarSectionsConfig } from "@/configs/sideBar.config";
import { addToast, Listbox, ListboxItem } from "@heroui/react";
import { BadgeRussianRuble, House, UserRoundPen } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { JSX } from "react";

const iconMap: Record<string, JSX.Element> = {
  UserRoundPen: <UserRoundPen />,
  House: <House />,
  BadgeRussianRuble: <BadgeRussianRuble />,
};

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full sm:max-w-40 px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

const SideBar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <ListboxWrapper>
      <Listbox variant="shadow" aria-label="Actions" selectedKeys={["Home"]}>
        {sideBarSectionsConfig.map((section) => (
          <ListboxItem
            key={section.title}
            startContent={iconMap[section.icon] || <></>}
            onClick={() => {
              if (!session)
                return addToast({
                  title: "Log in to use",
                  color: "danger",
                });
              if (section.travelUrl === "/user") {
                router.push(`${section.travelUrl}/${session?.user.id}`);
              } else {
                router.push(section.travelUrl);
              }
            }}
          >
            {section.title}
          </ListboxItem>
        ))}
      </Listbox>
    </ListboxWrapper>
  );
};

export default SideBar;
