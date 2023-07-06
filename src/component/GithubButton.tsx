"use client";

import { signIn } from "next-auth/react";
import { BsGithub } from "react-icons/bs";
const GithubButton = () => {
  return (
    <button
      type="button"
      onClick={() => signIn("github")}
      className="border flex items-center justify-center gap-2 mx-auto rounded-lg p-2 w-full bg-yellow-500  text-slate-950 font-semibold hover:shadow-lg duration-150 my-4"
    >
      <BsGithub className="text-3xl" /> Continue with Github
    </button>
  );
};

export default GithubButton;
