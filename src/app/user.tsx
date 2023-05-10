'use client'

import { useSession } from "next-auth/react";

export const User = () => {
  const { data: session } = useSession();

  return (
    <div>
      <h1> Control diabetes gesticional | Client session</h1>
      <pre> {JSON.stringify(session)} </pre>
    </div>
  );
};
