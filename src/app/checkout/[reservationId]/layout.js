"use client";

import Image from "next/image";
import { withAuthenticator } from "@aws-amplify/ui-react";

const components = {
  Header() {
    const { tokens } = useTheme();
    return (
      <header
        className="flex justify-center items-center w-full px-4 py-4 rounded-t-lg"
        style={{ backgroundColor: tokens.colors.background.primary }}
      >
        <Image
          src="/logo/Asset 1.png"
          width={256}
          height={81}
          alt="Travik logo"
          className="w-1/3 h-auto"
        />
      </header>
    );
  },
  Footer() {
    const { tokens } = useTheme();
    return (
      <footer
        className="flex justify-center items-center w-full px-4 py-4 rounded-b-lg"
        style={{
          backgroundColor: tokens.components.authenticator.router.backgroundColor,
          borderBottomWidth: tokens.components.authenticator.router.borderWidth,
          borderLeftWidth: tokens.components.authenticator.router.borderWidth,
          borderRightWidth: tokens.components.authenticator.router.borderWidth,
          borderColor: tokens.components.authenticator.router.borderColor,
        }}
      >
        <p className="text-sm text-center text-zinc-500 dark:text-zinc-400">
          © 2025 Travik. All rights reserved.
        </p>
      </footer>
    );
  },
};

function CreatePlanLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav className="flex flex-col items-center py-4">
        <Image
          src="/logo/Asset 1.png"
          width={180}
          height={180}
          alt="Travik logo"
          className="w-auto h-auto"
        />
      </nav>

      <main className="flex flex-col items-center min-h-full space-y-4 sm:mx-32 mx-8">
        {children}
      </main>
    </section>
  );
}

export default withAuthenticator(CreatePlanLayout, { components });
