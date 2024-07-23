"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/20/solid";
import { DropdownItem, DropdownLabel } from "./common/dropdown";

const styles = "h-4 w-4 text-gray-600 dark:text-gray-300";

export default function DarkModeButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return mounted ? (
    <DropdownItem
      aria-label={theme === "dark" ? "Toggle light mode" : "Toggle dark mode"}
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    >
      {theme === "dark" ? (
        <SunIcon className={styles} />
      ) : (
        <MoonIcon className={styles} />
      )}
      <DropdownLabel>Toggle Theme</DropdownLabel>
    </DropdownItem>
  ) : null;
}
