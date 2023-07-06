import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import NavLinks from "./NavLinks";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Suspense } from "react";
import { Session } from "next-auth";

const Navbar = async (): Promise<JSX.Element> => {
  const session = await getServerSession(authOptions);
  let parsed = null as Session | null;
  if (session) {
    parsed = JSON.parse(JSON.stringify(session));
  }
  return (
    <nav className="bg-slate-950 !sticky top-0">
      <div className="w-[98%] mx-auto max-w-screen-xl flex justify-between items-center p-2">
        <Link
          href="/"
          className="text-yellow-500 text-2xl font-bold tracking-tighter"
        >
          TMA
        </Link>
        <Suspense fallback={<h1>Loading...</h1>}>
          <NavLinks session={parsed} />
        </Suspense>
      </div>
    </nav>
  );
};

export default Navbar;
