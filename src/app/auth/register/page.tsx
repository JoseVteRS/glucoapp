"use client";
import { prisma } from "@/lib/prisma";
import React from "react";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  return (
    <div className="w-2/3 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label className="block font-semibold" htmlFor="name">
            Nombre
          </label>
          <input
            className="p-2 w-full rounded shadow"
            type="text"
            id="name"
            {...register("name")}
          />
        </div>
        <div className="mb-5">
          <label className="block font-semibold" htmlFor="email">
            Correo electronico
          </label>
          <input
            className="p-2 w-full rounded shadow"
            type="text"
            id="email"
            {...register("email")}
          />
        </div>
        <div className="mb-5">
          <label className="block font-semibold" htmlFor="email">
            Password
          </label>
          <input
            className="p-2 w-full rounded shadow"
            type="password"
            id="password"
            {...register("password")}
          />
        </div>
        <button
          className="bg-blue-500 rounded px-3 py-2 text-white hover:bg-blue-600"
          type="submit"
        >
          Registrarse
        </button>
      </form>

      <div className="mt-5">
        <a href="/api/auth/signin">Iniciar sesion</a>
      </div>
    </div>
  );
}
