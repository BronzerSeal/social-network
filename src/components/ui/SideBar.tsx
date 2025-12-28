"use client";
import { addToast, Listbox, ListboxItem } from "@heroui/react";
import { Contact, House, UserRoundPen } from "lucide-react";

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-40 px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

const SideBar = () => {
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
      >
        <ListboxItem key="new" startContent={<UserRoundPen />}>
          Profile
        </ListboxItem>
        <ListboxItem key="copy" startContent={<House />}>
          Home
        </ListboxItem>
        <ListboxItem key="edit" startContent={<Contact />}>
          Friends
        </ListboxItem>
      </Listbox>
    </ListboxWrapper>
  );
};

export default SideBar;
