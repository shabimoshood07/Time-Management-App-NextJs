"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    accessorKey: "description",
    header: () => <h1>Description</h1>,
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return <p className="text-left">{description}</p>;
    },
  },
  {
    accessorKey: "date",
    header: () => <h1 className="text-center">Date</h1>,
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
    header: () => <h1 className="text-center">Duration(H)</h1>,
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(task._id)}
            >
              Copy payment ID
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Task</DropdownMenuItem>
            <DropdownMenuItem>Delete Task</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
