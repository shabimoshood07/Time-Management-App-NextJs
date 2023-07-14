import ProfileSidebar from "@/component/ProfileSidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode | Promise<JSX.Element>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth");
  return (
    <div className="relative -z-[6] flex justify-end ">
      <ProfileSidebar />
      {children}
    </div>
  );
}
