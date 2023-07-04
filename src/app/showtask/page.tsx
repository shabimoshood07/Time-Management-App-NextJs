import Task from "@/model/task";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

import { Tasks, columns } from "./columns";
import { DataTable } from "./data-table";

const ShowTask = async () => {
  const session = await getServerSession(authOptions);
  const task = (await Task.find({ user: session?.user.id })) as Tasks[];

  const data = JSON.parse(JSON.stringify(task));

//   if (task.length === 0 || !task) return <h1>No Task found</h1>;
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ShowTask;
