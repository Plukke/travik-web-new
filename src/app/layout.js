import ConfigureAmplifyClientSide from "@/components/ConfigureAmplify";
import { Inter } from "next/font/google";

import "./globals.css";
import "@aws-amplify/ui-react/styles.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { ThemeProvider } from "next-themes";
import StoreProvider from "@/store/StoreProvider";

import { Navbar, NavbarItem, NavbarSpacer } from "@/components/common/navbar";
import { Avatar } from "@/components/common/avatar";
import {
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  DropdownButton,
} from "@/components/common/dropdown";
import { UserIcon } from "@heroicons/react/24/solid";
import {
  ArrowRightStartOnRectangleIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  ShieldCheckIcon,
} from "@heroicons/react/16/solid";
import DarkModeButton from "@/components/DarkModeButton";
import TabNavbar from "@/components/TabNavbar";
import LogoComponent from "@/components/LogoComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Travik",
  description: "La mejor forma de viajar...",
};

export default function RootLayout({ stacked, children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ConfigureAmplifyClientSide />
        <StoreProvider lastUpdate={new Date().getTime()}>
          <ThemeProvider attribute="class">
            <main className="flex min-h-screen flex-col px-4 py-20">
              <div className="z-[1] max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <Navbar className="fixed left-0 top-0 flex w-full justify-center bg-gradient-to-b from-zinc-100 px-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-100 lg:p-4 lg:dark:bg-zinc-800/30">
                  <LogoComponent />
                  <NavbarSpacer />
                  <Dropdown>
                    <DropdownButton as={NavbarItem} aria-label="Account menu">
                      <Avatar
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        square
                      />
                    </DropdownButton>
                    <DropdownMenu className="min-w-64" anchor="bottom end">
                      <DropdownItem href="/account">
                        <UserIcon />
                        <DropdownLabel>Mi cuenta</DropdownLabel>
                      </DropdownItem>
                      <DropdownItem href="/settings">
                        <Cog8ToothIcon />
                        <DropdownLabel>Ajustes</DropdownLabel>
                      </DropdownItem>
                      <DropdownDivider />
                      <DropdownItem href="/privacy-policy">
                        <ShieldCheckIcon />
                        <DropdownLabel>Política de privacidad</DropdownLabel>
                      </DropdownItem>
                      <DropdownItem href="/terms">
                        <LightBulbIcon />
                        <DropdownLabel>Términos y condiciones</DropdownLabel>
                      </DropdownItem>
                      <DropdownDivider />

                      <DarkModeButton />

                      <DropdownItem href="/logout">
                        <ArrowRightStartOnRectangleIcon />
                        <DropdownLabel>Sign out</DropdownLabel>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </Navbar>

                <TabNavbar />
              </div>
              {children}
            </main>
            <div id="headlessui-portal-root">{stacked}</div>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
