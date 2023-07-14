"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Error() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const router = useRouter();

  return (
    <div className=" w-full flex flex-col items-center justify-center h-[400px] gap-5 py-5 px-2">
      <h1 className="text-3xl text-slate-950">Error!!</h1>
      <h2 className="text-slate-950 text-2xl text-center font-bold">
        {error || "Something went wrong"}
      </h2>
      <button
        onClick={() => router.back()}
        className="border bg-yellow-500 w-full rounded-md text-xl py-1 sm:py-2 sm:w-96 hover:shadow-lg duration-150"
      >
        Go Back
      </button>
    </div>
  );
}
