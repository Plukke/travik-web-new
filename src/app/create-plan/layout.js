"use client";

import { withAuthenticator } from "@aws-amplify/ui-react";

function CreatePlanLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
      <main className="flex flex-col items-center min-h-full space-y-4 sm:mx-32 mx-8">
        {children}
      </main>
    </section>
  );
}

export default withAuthenticator(CreatePlanLayout);
