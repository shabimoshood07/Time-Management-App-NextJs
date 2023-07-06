"use client";

import { signIn } from "next-auth/react";
import {FcGoogle} from "react-icons/fc";

const GoogleButton = () => {
  return (
    <button
      type="button"
      onClick={() => signIn("google")}
      className="border flex items-center justify-center gap-2 mx-auto rounded-lg p-2 w-full bg-yellow-500  text-slate-950 font-semibold hover:shadow-lg duration-150 my-4"
    >
      <FcGoogle className="text-3xl" /> Continue with Google
    </button>
  );
};

export default GoogleButton;
