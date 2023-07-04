import React from "react";
import Link from "next/link";
import { Session } from "next-auth";
const Hero = ({ session }: { session: Session }) => {
  return (
    <div className=" h-[calc(100vh-48px)]  bg-[url('/hero.jpg')] bg-no-repeat bg-cover bg-center flex flex-col lg:flex-row items-center lg:justify-center pt-20 lg:pt-0">
      <h1 className="text-center text-xl font-semibold text-slate-950 sm:text-2xl md:text-4xl xl:text-5xl 2xl:text-6xl  mx-auto w-[98%] md:w-[90%] max-w-[1200px] md:flex flex-col justify-center lg:text-left leading-loose lg:border-2 lg:p-8 lg:h-full lg:bg-slate-200">
        <span className="mr-1 ">Task Manager:</span>
        Elevate Your Job Management Experience, Achieve Your Goals!!
      </h1>
      <div className="w-[98%] mx-auto  flex flex-col items-center justify-center gap-4 mt-3 lg:mt-0">
        {session ? (
          <>
            <Link href="/addtask" className="btn !w-[95%] max-w-[500px] text-center !font-semibold text-xl lg:text-sxl md:!py-3">
              Add Task
            </Link>
            <Link href="/showtask" className="btn !w-[95%] max-w-[500px] text-center !font-semibold text-xl lg:text-sxl md:!py-3">
              Show All Task
            </Link>
          </>
        ) : (
          <Link href="auth" className="btn !w-[95%] max-w-[600px] text-center !mt-10 !font-semibold text-xl lg:text-sxl md:!py-4">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Hero;
