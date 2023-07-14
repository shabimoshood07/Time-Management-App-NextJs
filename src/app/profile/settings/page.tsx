import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PreferredWorkingHourForm from "@/component/PreferredWorkingHourForm";
import PreferredWorkingHourTable from "@/component/PreferredWorkingHourTable";
import ProfilePageHeading from "@/component/ProfilePageHeading";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Settings = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth");
  const userId: string | undefined = session?.user.id;
  return (
    <div
      className="w-[calc(100vw-50px)] 2xl:w-[calc(100vw-380px)] 
    sm:w-[calc(100vw-144px)]"
    >
      <div className="w-[98%] md:w-[90%] mx-auto max-w-[1200px] mt-2">
        <ProfilePageHeading />
        <h1 className="w-[98%] md:w-[90%] mx-auto max-w-[1200px] text-xl sm:text-xl lg:text-3xl font-semibold text-center text-slate-950 mb-4 tracking-wide">
          Settings
        </h1>

        <div className="flex justify-between items-start xl:gap-8 flex-wrap p-2 gap-4">
          <PreferredWorkingHourForm userId={userId} />
          <PreferredWorkingHourTable session={session} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
