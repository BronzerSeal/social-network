"use client";
import { sideBarSectionsConfig } from "@/configs/sideBar.config";
import { addToast, Listbox, ListboxItem } from "@heroui/react";
import { Contact, House, UserRoundPen } from "lucide-react";
import { JSX, useState } from "react";

const iconMap: Record<string, JSX.Element> = {
  UserRoundPen: <UserRoundPen />,
  House: <House />,
  Contact: <Contact />,
};

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full sm:max-w-40 px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

const SideBar = () => {
  const [choosedSection, setChoosedSection] = useState("Home");

  return (
    <ListboxWrapper>
      <Listbox
        variant="shadow"
        aria-label="Actions"
        onAction={(key) =>
          addToast({
            title: key,
            color: "success",
          })
        }
        selectedKeys={["Home"]}
      >
        {sideBarSectionsConfig.map((section) => (
          <ListboxItem
            key={section.title}
            startContent={iconMap[section.icon] || <></>}
            isSelected={section.title === choosedSection}
          >
            {section.title}
          </ListboxItem>
        ))}
      </Listbox>
    </ListboxWrapper>
  );
};

export default SideBar;
