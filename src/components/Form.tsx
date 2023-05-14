"use client";

import { prisma } from "@/lib/prisma";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";

export const Form = () => {
  const { register, handleSubmit } = useForm();
  const session = useSession();

  const onSubmit = async (dataForm: any) => {

    await fetch("/api/control/create", {
      method: "POST",
      body: JSON.stringify({
        ...dataForm
      }),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} action='/api/conrol/create'>
      <div className="border flex items-center justify-center ">
        <input
          type="text"
          placeholder="Valor"
          className="focus:outline-none bg-fuchsia-50 text-center w-1/2 p-2 text-sm font-semibold"
          {...register("value")}
        />

        <select
          id="moment"
          className="focus:outline-none bg-fuchsia-50 text-left w-1/2 p-2 text-sm"
          {...register("moment")}
        >
          <option value="FASTING">En ayunas</option>
          <option value="ONE_HOUR_AFTER_BREAKFAST">1h post desayuno</option>
          <option value="ONE_HOUR_BEFORE_LUNCH">1h pre comida</option>
          <option value="ONE_HOUR_AFTER_LUNCH">1h post comida</option>
          <option value="ONE_HOUR_BEFORE_DINNER">1h pre cena</option>
          <option value="ONE_HOUR_AFTER_DINNER">1h post cena</option>
        </select>
      </div>

      <button className="bg-fuchsia-500 text-white font-semibold p-2 rounded-md w-1/2">
        Agregar
      </button>
    </form>
  );
};
