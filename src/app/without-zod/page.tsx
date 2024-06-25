"use client";

import { FieldValues, useForm } from "react-hook-form";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      email: "Thanos",
      password: "",
      confirmPassword: "",
    },
  });
  console.log("email:", getValues("email"));

  // data is only available if all the inbuilt validations are passing
  const onsubmit = async (data: FieldValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    reset();
  };

  return (
    <form
      className="mt-28 flex flex-col gap-6 p-7"
      onSubmit={handleSubmit(onsubmit)}
    >
      <input
        type="email"
        placeholder="Email"
        {...register("email", {
          required: "Email is required",
        })}
      />
      {errors?.email && (
        <span className="text-red-600">{`${errors?.email?.message}`}</span>
      )}
      <input
        type="password"
        placeholder="Password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 10,
            message: "Password must be at least 10 characters",
          },
        })}
      />
      {errors?.password && (
        <span className="text-red-600">{`${errors?.password?.message}`}</span>
      )}
      <input
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword", {
          required: "Confirm Password is required",
          // additional validation
          validate: (value) =>
            value === getValues("password") || "Password must match",
        })}
      />
      {errors?.confirmPassword && (
        <span className="text-red-600">{`${errors?.confirmPassword?.message}`}</span>
      )}
      <button
        type="submit"
        className={` max-w-fit rounded-md px-8 py-2  text-white ${
          isSubmitting ? "bg-gray-500" : "bg-teal-700"
        }`}
        disabled={isSubmitting}
      >
        Submit
      </button>
    </form>
  );
}
