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
  const navToggle = showNav ? " w-screen p-2" : "!w-0 p-0";

  const handleNavToggle = () => {
    setShowNav(!showNav);
  };

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
        className={`${navToggle} duration-300 fixed overflow-hidden top-[48px] !z-20  h-[calc(100vh-49.6px)]  bg-slate-400 flex flex-col sm:hidden right-0`}
        onClick={handleNavToggle}
      >
        {!session ? (
          <button onClick={() => signIn()} className="btn text-center">
            Sign up
          </button>
        ) : (
          <>
            <Link
              href="/profile/dashboard"
              className="text-yellow-500 font-semibold flex items-center w-full justify-center gap-2 my-4 text-xl"
            >
              Profile
              {session.user.image && (
                <Image
                  src={session.user?.image}
                  alt={session.user.name}
                  height={50}
                  width={50}
                  className="rounded-full"
                />
              )}
            </Link>
            <button className="btn !mt-4 !text-red-600 font-semibold !text-xl hover:!text-yellow-500 duration-500"  onClick={() => signOut()}>
              Log out
            </button>
          </>
        )}
      </div>

      {/* desktop nav */}
      <div className="hidden sm:flex items-center gap-3">
        {!session ? (
          <button
            onClick={() => signIn()}
            className="btn !bg-slate-200 !text-slate-950 !font-bold w-[180px] hover:!bg-yellow-500 duration-500 text-center"
          >
            Sign up
          </button>
        ) : (
          <>
            {session.user.image ? (
              <Link
                href="/profile/dashboard"
                className=" flex items-center w-full justify-center"
              >
                <Image
                  src={session.user?.image}
                  alt={session.user.email.slice(0, 4)}
                  height={50}
                  width={50}
                  className="text-yellow-500 rounded-full hover:border-2 hover:border-yellow-500 duration-300 hover:scale-[1.2]"
                />
              </Link>
            ) : (
              <Link
              href="/profile/dashboard"
                className="text-yellow-500 text-xl font-semibold"
              >
                Profile
              </Link>
            )}
            <button
              className="btn !bg-slate-200 !text-red-600 !font-bold w-[150px] hover:!bg-yellow-500  duration-500"
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
