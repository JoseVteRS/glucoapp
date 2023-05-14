import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { LoginButton, LogoutButton } from "./auth";
import { User } from "./user";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="">
      {session ? <LogoutButton /> : <LoginButton />}

      <h1 className="font-bold"> Control</h1>
      <h2>Server session</h2>
      <pre> {JSON.stringify(session)} </pre>

      <Link href={`/control`}>Ir a control</Link>
      <User />
    </main>
  );
}
