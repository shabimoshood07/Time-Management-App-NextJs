"use client";
import { signIn } from "next-auth/react";
import React from "react";

const AuthForm = () => {
  const handleSubmit = async (formData: FormData) => {
    signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
    });
  };
  return (
    <form
      action={handleSubmit}
      className="w-full p-2 -slate-950 rounded-md"
      autoComplete="off"
    >
      <label htmlFor="email">Email</label>
      <input
        type="text"
        autoComplete="off"
        name="email"
        required
        className="block w-full mb-2 h-8 px-2 rounded-md active:outline-slate-950 text-lg"
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        required
        className="block w-full mb-2 h-8 px-2 rounded-md active:outline-slate-950 text-lg"
        autoComplete="new-password"
      />
      <button
        type="submit"
        className="border block mx-auto rounded-lg p-2 w-full bg-yellow-500  text-slate-950 font-semibold hover:shadow-lg duration-150 my-4"
      >
        Submit
      </button>

      <span className="w-full text-center block capitalize font-bold">or</span>
    </form>
  );
};

export default AuthForm;
