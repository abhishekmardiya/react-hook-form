"use client";

import { SignUpInterface, signUpSchema } from "@/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<SignUpInterface>({
    // zod resolver
    // client side validations
    resolver: zodResolver(signUpSchema),
  });

  // data is only available if all the inbuilt validations are passing
  // if you do not have any type for dat then give FieldValue type from react-hook-form
  const onsubmit = async (data: SignUpInterface) => {
    console.log("data:", data);
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await res.json();

    if (!res?.ok) {
      alert("Form submission failed");
      return;
    }

    if (resData?.errors) {
      const errors = resData?.errors;

      if (errors?.email) {
        setError("email", {
          type: "server",
          message: errors?.email,
        });
      }
      if (errors?.password) {
        setError("password", {
          type: "server",
          message: errors?.password,
        });
      }
      if (errors?.confirmPassword) {
        setError("confirmPassword", {
          type: "server",
          message: errors?.confirmPassword,
        });
      }
    }

    reset();
  };

  return (
    <form
      className="flex flex-col gap-6 mt-28 p-7"
      onSubmit={handleSubmit(onsubmit)}
    >
      <input type="email" placeholder="Email" {...register("email")} />
      {errors?.email && (
        <span className="text-red-600">{`${errors?.email?.message}`}</span>
      )}
      <input type="password" placeholder="Password" {...register("password")} />
      {errors?.password && (
        <span className="text-red-600">{`${errors?.password?.message}`}</span>
      )}
      <input
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword")}
      />
      {errors?.confirmPassword && (
        <span className="text-red-600">{`${errors?.confirmPassword?.message}`}</span>
      )}
      <button
        type="submit"
        className={` py-2 px-8 rounded-md max-w-fit  text-white ${
          isSubmitting ? "bg-gray-500" : "bg-teal-700"
        }`}
        disabled={isSubmitting}
      >
        Submit
      </button>
    </form>
  );
}
