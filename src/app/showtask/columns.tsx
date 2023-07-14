"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
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
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("date") as string;
      return <p className="tex-left w-[100px]">{date}</p>;
    },
  },
  {
    accessorKey: "day",
    header: () => <h1 className="text-center">Day</h1>,
  },
  {
    accessorKey: "description",
    header: () => <h1 className="text-center">Description</h1>,
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
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center justify-center mr-0 text-center"
        >
          Duration(Hr)
          <ArrowUpDown className=" h-4 w-4" />
        </button>
      );
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
        <div className="flex gap-4 items-center justify-center">
          <Link
            href={`/showtask/${task._id}`}
            className="hover:scale-125 duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Link>

          <DeleteTaskButton id={task._id} />
        </div>
      );
    },
  },
];
