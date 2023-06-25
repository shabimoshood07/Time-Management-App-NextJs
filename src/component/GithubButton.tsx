"use client";

import { signIn } from "next-auth/react";

const GithubButton = () => {
  return (
    <button type="button" onClick={() => signIn("github")} className="border block mx-auto rounded-lg p-2 w-full bg-yellow-500  text-slate-950 font-semibold hover:shadow-lg duration-150 my-4">
      Continue with Github
    </button>
  );
};

export default GithubButton;
