"use client";

import { prisma } from "@/lib/prisma";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

export const Form = () => {
  const { register, handleSubmit, reset } = useForm();

  const queryClient = useQueryClient();

  const { mutate, isLoading: isLoadingMutation } = useMutation({
    mutationFn: async (dataForm: any) => {
      await fetch("/api/control/create", {
        method: "POST",
        body: JSON.stringify({
          ...dataForm,
        }),
      });
    },
    onMutate: async (newDataControl: any) => {
      await queryClient.cancelQueries(["controls"]);

      const previousControls = queryClient.getQueryData(["controls"]);

      queryClient.setQueryData(["controls"], (oldData?: any) => {
        const newControlData = structuredClone(newDataControl);

        if (oldData.controlData == null) return [newControlData];
        return [...oldData.controlData, newControlData];
      });

      return { previousControls };
    },
    onError: (error, variables, context) => {
      if (context?.previousControls) {
        queryClient.setQueryData(["controls"], context.previousControls);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["controls"],
      });
    },
  });

  const onSubmit = async (dataForm: any) => {
    if (isLoadingMutation) return;

    if (dataForm.value !== "" && dataForm.moment !== "") {
      mutate(dataForm);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} action="/api/conrol/create">
      <div className=" flex items-center justify-center ">
        <input
          type="text"
          placeholder="Valor"
          className="focus:outline-none border bg-fuchsia-50 text-center w-4/12 p-2 text-sm font-semibold"
          {...register("value")}
        />

        <input
          type="text"
          placeholder="Detalles"
          className="focus:outline-none border bg-fuchsia-50 text-left w-4/12 p-2 text-sm"
          {...register("details")}
        />

        <select
          id="moment"
          className="focus:outline-none border bg-fuchsia-50 text-left w-4/12 p-2 text-sm"
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

      <button
        disabled={isLoadingMutation}
        className="bg-fuchsia-800 hover:bg-fuchsia-900 text-white font-semibold p-2 w-full"
      >
        {isLoadingMutation ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
};
