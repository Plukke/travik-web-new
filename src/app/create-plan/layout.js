"use client";

import Image from "next/image";
import { withAuthenticator } from "@aws-amplify/ui-react";

function CreatePlanLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
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

export default withAuthenticator(CreatePlanLayout);
