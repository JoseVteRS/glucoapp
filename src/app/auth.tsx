"use client";

import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
  return <button className="bg-fuchsia-800 text-white font-semibold rounded px-3 py-2 hover:bg-fuchsia-900" onClick={() => signIn()}>Iniciar sesión</button>;
};

export const LogoutButton = () => {
  return <button className="bg-fuchsia-800 text-white font-semibold rounded px-3 py-2 hover:bg-fuchsia-900" onClick={() => signOut()}>Salir</button>;
};
