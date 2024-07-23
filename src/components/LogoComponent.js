"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useTheme } from "next-themes";
import { Link } from "./common/link";

export default function LogoComponent() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return mounted ? (
    <Link href="/" aria-label="Home">
      <Image
        src={theme === "dark" ? "/logo/Asset 2.png" : "/logo/Asset 1.png"}
        width={64}
        height={64}
        alt="Travik logo"
        // className="w-auto h-auto"
      />
    </Link>
  ) : null;
}
