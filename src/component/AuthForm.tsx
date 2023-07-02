"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { redirect, useRouter } from "next/navigation";
const AuthForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      // redirect: false,
    })
      // .then((res) => {
      //   console.log(res);
      //   toast({
      //     title: "Successful",
      //     description: "Logged In successfully",
      //   });
      // })
      // .then(() => {
      //   router.prefetch("/");
      // })
      // .catch((error) => {
      //   toast({
      //     variant: "destructive",
      //     title: "Error",
      //     description: error,
      //   });
      // });

    // .then((res) => {
    //   if (res?.error === null) {
    //     toast({
    //       title: "Successful",
    //       description: "Logged In successfully",
    //     });
    //     // router.push("/");
    //     router.prefetch("/");
    //   } else {
    //     toast({
    //       variant: "destructive",
    //       title: "Error",
    //       description: res?.error,
    //     });
    //   }
    // });
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
