"use client";

import { usePathname } from "next/navigation";

import { Navbar, NavbarItem, NavbarSection } from "@/components/common/navbar";

import {
  BellIcon,
  HomeModernIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

export default function TabNavbar() {
  const pathname = usePathname();
  return (
    <Navbar className="fixed bottom-0 left-0 flex w-full items-end justify-around bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
      <NavbarSection className="gap-8">
        <NavbarItem href="/" current={pathname === "/"}>
          <HomeModernIcon />
        </NavbarItem>
        <NavbarItem href="/search" current={pathname === "/search"}>
          <MagnifyingGlassIcon />
        </NavbarItem>
        <NavbarItem href="/messages" current={pathname === "/messages"}>
          <BellIcon />
        </NavbarItem>
        <NavbarItem href="/account" current={pathname === "/account"}>
          <UserIcon />
        </NavbarItem>
      </NavbarSection>
    </Navbar>
  );
}
