import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Task from "@/model/task";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import BackButton from "@/component/BackButton";

const TaskPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/auth");
  const task = await Task.findOne({ _id: id, user: session?.user.id });
  if (!task) return notFound();
  const data = [JSON.parse(JSON.stringify(task))];

  return (
    <div className="mt-2">
      <div className="w-[98%] md:w-[90%] mx-auto max-w-[1200px]">
        <BackButton page="task" />
        <h1 className="w-[98%] md:w-[90%] mx-auto max-w-[1200px] text-xl sm:text-2xl lg:text-3xl font-semibold text-center text-slate-950 mb-4 tracking-wide">
          Task
        </h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default TaskPage;
