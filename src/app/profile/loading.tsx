import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div
      className=" h-[calc(100vh-48px)] sm:h-[calc(100vh-72px)] relative w-[calc(100vw-50px)] 2xl:w-[calc(100vw-500px)] 
    sm:w-[calc(100vw-144px)] -z-[2]  flex justify-center"
    >
      <Skeleton className="h-[150px] w-[150px] md:w-[200px] md:h-[200px] bg-yellow-500 rounded-full flex items-center justify-center flex-col mt-10">
        <h1 className="text-slate-950 text-2xl text-center font-extrabold tracking-wider">
          TMA
        </h1>
        <Skeleton className="text-slate-950 p-1 bg-yellow-600">
          Loading...
        </Skeleton>
      </Skeleton>
    </div>
  );
};

export default Loading;
