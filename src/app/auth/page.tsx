import GoogleButton from "@/component/GoogleButton";
import GithubButton from "@/component/GithubButton";
import AuthForm from "@/component/AuthForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
const Auth = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  return (
    <div className="border-2 border-slate-950 rounded-xl w-[98%] mx-auto max-w-xl my-16 py-2 px-4">
      <h1 className="text-center text-2xl font-bold text-slate-950">Sign In</h1>
      <AuthForm />
      <GoogleButton />
      <GithubButton />
    </div>
  );
};

export default Auth;
