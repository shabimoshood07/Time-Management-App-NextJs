import Task from "@/model/task";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

import { Tasks, columns } from "./columns";
import { DataTable } from "./data-table";
import BackButton from "@/component/BackButton";
import { redirect } from "next/navigation";
import { getUserPreferredWorkingHour } from "@/lib/actions";

type PWH = {
  day: string;
  startTime: string;
  endTime: string;
};

const ShowTask = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth");
  const task = (await Task.find({ user: session?.user.id }).sort(
    "-createdAt"
  )) as Tasks[];
  const preferredWorkingHours = (await getUserPreferredWorkingHour(
    session
  )) as PWH[];

  const data = JSON.parse(JSON.stringify(task));
  return (
    <div className="mt-2">
      <div className="w-[98%] md:w-[90%] mx-auto max-w-[1200px]">
        <BackButton page="showtask" />
        <h1 className="w-[98%] md:w-[90%] mx-auto max-w-[1200px] text-xl sm:text-2xl lg:text-3xl font-semibold text-center text-slate-950 mb-4 tracking-wide">
          All Task
        </h1>
      </div>
      <DataTable
        columns={columns}
        data={data}
        preferredWorkingHours={preferredWorkingHours}
      />
    </div>
  );
};

export default ShowTask;
