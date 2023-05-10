import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { User } from "./user";
import { LoginButton, LogoutButton } from "./auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="">
      <LoginButton />
      <LogoutButton />

      <h1> Control diabetes gesticional </h1>
      <h2>Server session</h2>
      <pre> {JSON.stringify(session)} </pre>

      <h2>Client sesison</h2>
      <User />
    </main>
  );
}
