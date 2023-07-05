"use client"
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      className="btn !float-none !p-1 text-[15px] sm:text-xl lg:text-2xl !px-2 hover:shadow-xl"
      onClick={() => router.back()}
    >
      Back
    </button>
  );
};

export default BackButton;
