"use client";

import PreferredWorkingHourTableButtons from "@/component/PreferredWorkingHourTableButtons";
import { deletePreferredWorkingHour } from "@/lib/actions";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
export type Tasks = {
  startTime: string;
  endTime: string;
  day: string;
};

export const columns: ColumnDef<Tasks>[] = [
  {
    accessorKey: "day",
    header: () => <h1 className="text-left">Day</h1>,
    cell: ({ row }) => {
      const data = row.original;
      return <h1 className="text-left capitalize">{data.day}</h1>;
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
    id: "actions",
    cell: ({ row }) => {
      const rowdata = row.original;
      return (
        <PreferredWorkingHourTableButtons
          deletePreferredWorkingHour={deletePreferredWorkingHour}
          day={rowdata.day}
        />
      );
    },
  },
];
