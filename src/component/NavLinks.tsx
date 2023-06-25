"use client";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Session {
  user: {
    name: string;
    email?: string;
    image?: string;
  } | null;
}

const NavLinks = ({ session }: any) => {
  const [showNav, setShowNav] = useState(false);
  const navToggle = showNav ? "right-0 " : "-right-[900px]";

  const handleNavToggle = () => {
    setShowNav(!showNav);
  };

  console.log("session", session);
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-8 h-8 text-yellow-500 cursor-pointer sm:hidden"
        onClick={handleNavToggle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
        />
      </svg>

      {/* mobile nav */}
      <div
        className={`${navToggle} duration-300 absolute top-[100%]  h-[calc(100vh-49.6px)] w-screen bg-slate-400 p-2 flex flex-col sm:hidden`}
        onClick={handleNavToggle}
      >
        {!session ? (
          <Link href="/auth" className="btn text-center">
            Sign up
          </Link>
        ) : (
          <>
            <Link
              href="/profile"
              className="text-yellow-500 font-semibold flex items-center w-full justify-center gap-2 tex"
            >
              Profile
              <Image
                src={session.user?.image}
                alt={session.user.name}
                height={50}
                width={50}
                className="rounded-full"
              />
            </Link>
            <button className="btn" onClick={() => signOut()}>
              Sign out
            </button>
          </>
        )}
      </div>

      {/* desktop nav */}

      <div className="hidden sm:flex ">
        {!session ? (
          <Link
            href="/auth"
            className="btn !bg-slate-200 !text-slate-950 !font-bold w-[180px] hover:!bg-yellow-500 duration-500 text-center"
          >
            Sign up
          </Link>
        ) : (
          <>
            <Link
              href="/profile"
              className=" flex items-center w-full justify-center"
            >
              <Image
                src={session.user?.image}
                alt={session.user.name}
                height={50}
                width={50}
                className="rounded-full hover:border-2 hover:border-yellow-500 duration-300 hover:scale-[1.2]"
              />
            </Link>
            <button
              className="btn !bg-slate-200 !text-slate-950 !font-bold w-[180px] hover:!bg-yellow-500 duration-500"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavLinks;
