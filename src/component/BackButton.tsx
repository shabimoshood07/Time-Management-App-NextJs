"use client";
import { useRouter } from "next/navigation";

const BackButton = ({ page }: { page: string }) => {
  const router = useRouter();
  return (
    <button
      className="btn !float-none !p-1 text-[15px]  lg:text-xl !px-2 hover:shadow-xl"
      onClick={() => router.back()}
      // onClick={
      //   page === "showtask" || page === "addtask"
      //     ? () => router.push("/")
      //     : () => router.back()
      // }
    >
      Back
    </button>
  );
};

export default BackButton;
