import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardHighlight from "@/component/DashboardHighlight";
import ProfilePageHeading from "@/component/ProfilePageHeading";
import Task from "@/model/task";
import User from "@/model/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Tasks = {
  _id: string;
  description: string;
  startTime: string;
  endTime: string;
  date: string;
  duration: number;
  day?: string;
  user: string;
};

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth");

  const user = await User.findOne({ _id: session.user.id });

  const tasks = (await Task.find({ user: session.user.id }).select(
    "-__v -createdAt -updatedAt "
  )) as Tasks[];

  return (
    <div
      className="w-[calc(100vw-50px)] 2xl:w-[calc(100vw-500px)] 
    sm:w-[calc(100vw-144px)]"
    >
      <div className="w-[98%] md:w-[90%] mx-auto max-w-[1200px] mt-2">
        <ProfilePageHeading />
        <h1 className="w-[98%] md:w-[90%] mx-auto max-w-[1200px] text-xl sm:text-2xl lg:text-3xl font-semibold text-center text-slate-950 mb-4 tracking-wide">
          Dashboard
        </h1>
        <DashboardHighlight tasks={tasks} />
      </div>
    </div>
  );
};

export default Dashboard;
