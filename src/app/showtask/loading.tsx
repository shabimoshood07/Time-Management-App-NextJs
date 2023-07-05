"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

import {
  flexRender,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import React from "react";
import { columns } from "../showtask/columns";
import { Skeleton } from "@/components/ui/skeleton";
import BackButton from "@/component/BackButton";

export function DataTable<TData, TValue>() {
  const table = useReactTable({
    columns,
    data: [],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-2">
      <div className="w-[98%] md:w-[90%] mx-auto max-w-[1200px]">
        <BackButton />
        <h1 className="w-[98%] md:w-[90%] mx-auto max-w-[1200px] text-xl sm:text-2xl lg:text-3xl font-semibold text-center text-slate-950 mb-4 tracking-wide">
          All Task
        </h1>
      </div>
      <div className="flex items-center py-4 w-[98%] md:w-[90%] mx-auto max-w-[1200px]">
        <input
          placeholder="Filter by description..."
          className="w-1/2 p-1 rounded-sm text-slate-950"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto btn flex items-center gap-1 hover:shadow-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                />
              </svg>
              Toggle Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-yellow-500 p-2"
          ></DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table className=" w-[98%] md:w-[90%] mx-auto max-w-[1200px] min-w-[600px] overflow-x-scroll ">
        <TableHeader className="">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="font-bold text-slate-950  border border-yellow-500"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {Array.from({ length: 1 }).map((row: any, index) => (
            <TableRow key={index}>
              {Array.from({ length: columns.length }).map(
                (cell: any, index) => (
                  <TableCell
                    key={index}
                    className=" border border-yellow-500 text-center"
                  >
                    <Skeleton className="h-7 w-full bg-yellow-300" />
                  </TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTable;
