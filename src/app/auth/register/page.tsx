"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";


export default function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const { replace } = useRouter();

  const onSubmit = async (data: any) => {
    await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    replace("/api/auth/signin");
    
  };

  return (
    <section className="bg-fuchsia-100 min-h-screen flex items-center justify-center flex-col px-5 ">
      <h1 className="text-3xl font-bold text-gray-900 mb-5" >Registro</h1>
      <div className="mx-auto bg-white p-3 rounded-xl shadow-xl shadow-fuchsia-200/50 w-full md:w-1/2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label className="block font-semibold" htmlFor="name">
              Nombre
            </label>
            <input
              className="p-2 w-full border border-fuchsia-200/40 rounded"
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
              className="p-2 w-full border border-fuchsia-200/40 rounded"
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
              className="p-2 w-full border border-fuchsia-200/40 rounded"
              type="password"
              id="password"
              {...register("password")}
            />
          </div>
          <div className="flex justify-end w-full">
            <button
              className="bg-fuchsia-800 rounded  px-3 py-2 text-white font-semibold hover:bg-fuchsia-900"
              type="submit"
            >
              Registrarse
            </button>
          </div>
        </form>
        <div className="mt-5 flex justify-end">
          <a href="/api/auth/signin">¿Ya tienes cuenta?</a>
        </div>
      </div>
    </section>
  );
}
