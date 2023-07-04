import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div>
      <Skeleton className="w-[100px] h-[200px] rounded-full bg-red-800" />
    </div>
  );
};

export default Loading;
