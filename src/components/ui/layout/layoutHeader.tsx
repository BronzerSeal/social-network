"use client";
import { layoutConfig } from "@/configs/layout.config";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  addToast,
} from "@heroui/react";
import Logo from "@/images/Logo";
import { useState } from "react";
import { signOutFunc } from "@/actions/sign-out";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SearchIcon } from "lucide-react";

export default function LayoutHeader() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [searchValue, setSearchValue] = useState("");

  if (status === "loading") return <p>Loading...</p>;
  else if (status === "unauthenticated") return <p>Unauthenticated</p>;

  const changeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const handleSearchValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const search = async (something: string) => {
      addToast({
        title: something,
        color: "success",
      });
    };
    if (e.key === "Enter") {
      search(searchValue);
      setSearchValue("");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutFunc();
      router.push("/");
    } catch (error) {
      addToast({
        title: "Something was wrong, Try again later",
        color: "danger",
      });
      console.log("Error", error);
    }
  };

  return (
    <Navbar className={`h-${layoutConfig.headerHeight}`}>
      <NavbarItem className="flex gap-3 items-center">
        <Logo width={130} />
        <NavbarContent>
          <Input
            onInput={changeSearchValue}
            onKeyDown={handleSearchValue}
            value={searchValue}
            placeholder="Search"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
        </NavbarContent>
      </NavbarItem>
      <NavbarContent justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="success"
              name={session?.user?.name || "user"}
              size="sm"
              src={
                session?.user?.image ||
                session?.user?.name ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxtrl0ohoaUwmcQnPCoWlgM3zuA6-3zXX7PQ&s"
              }
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">
                {session?.user?.name || session?.user?.name}
              </p>
            </DropdownItem>
            <DropdownItem
              key="settings"
              onClick={() => router.push("/settings")}
            >
              My Settings
            </DropdownItem>
            <DropdownItem
              key="help_and_feedback"
              onClick={() => router.push("/help")}
            >
              Help & Feedback
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleSignOut}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
