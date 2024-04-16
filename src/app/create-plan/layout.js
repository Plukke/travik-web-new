"use client";

import { withAuthenticator } from "@aws-amplify/ui-react";

function CreatePlanLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav></nav>

      {children}
    </section>
  );
}

export default withAuthenticator(CreatePlanLayout);
