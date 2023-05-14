import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { LoginButton, LogoutButton } from "./auth";
import { User } from "./user";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="">
      <nav className="flex items-center justify-between p-2 bg-fuchsia-300">
        <h1 className="font-bold text-fuchsia-900"> {session?.user?.name}</h1>
        {session ? <LogoutButton /> : <LoginButton />}
      </nav>

      <div className="flex items-center justify-center mt-10">
        <Link
          className="bg-fuchsia-800 hover:bg-fuchsia-900 text-white font-semibold px-2 py-3 rounded shadow-xl shadow-fuchsia-300/40"
          href={`/control`}
        >
          Ir a control
        </Link>
      </div>
    </main>
  );
}
