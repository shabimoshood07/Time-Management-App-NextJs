"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import DeleteTaskButton from "@/component/DeleteTaskButton";
export type Tasks = {
  _id: string;
  description: string;
  startTime: string;
  endTime: string;
  date: string;
  duration: Number;
};

export const columns: ColumnDef<Tasks>[] = [
  {
    accessorKey: "date",

    header: ({ column }) => {
      return <p>Date</p>;
    },
  },
  {
    accessorKey: "description",
    header: () => <h1>Description</h1>,
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return (
        <p className="text-left max-w-[500px] min-w-[300px]">{description}</p>
      );
    },
  },
  {
    accessorKey: "startTime",
    header: () => <h1 className="text-center">Start Time</h1>,
  },
  {
    accessorKey: "endTime",
    header: () => <h1 className="text-center">End Time</h1>,
  },
  {
    accessorKey: "duration",
    header: ({ column }) => {
      return <p className="text-center">Duration(Hr)</p>;
    },
    cell: ({ row }) => {
      const duration = row.getValue("duration") as number;
      return <p>{duration.toFixed(2)}</p>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const task = row.original;

      return (
        <div className="flex gap-2 items-center justify-center">
          <DeleteTaskButton id={task._id} />
        </div>
      );
    },
  },
];
