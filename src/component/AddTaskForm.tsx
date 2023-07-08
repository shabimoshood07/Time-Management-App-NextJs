"use client";
import BackButton from "./BackButton";
import { useToast } from "@/components/ui/use-toast";
import { useRef } from "react";
const AddTaskForm = ({ addTask }: any) => {
  const { toast } = useToast();

  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formdata: FormData) => {
    try {
      const { newTask } = await addTask(formdata);
      if (newTask) {
        toast({
          title: "Successfull",
          description: "Task addedd succefully",
        });
        if (form.current) {
          form.current.reset();
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };
  return (
    <>
      <div className="w-[98%] md:w-[90%] mx-auto max-w-[1200px]">
        <BackButton page="addtask" />
        <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Add New Task
        </h2>
      </div>

      <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-md">
        <form
          className="space-y-4"
          action={handleSubmit}
          autoComplete="off"
          ref={form}
        >
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-slate-950"
            >
              Description
            </label>
            <div className="mt-1">
              <textarea
                name="description"
                rows={5}
                required
                className="block w-full rounded-md border-0 py-1.5 text-slate-950 shadow-sm ring-1 ring-inset ring-slate-950 placeholder:text-slate-950 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium leading-6 text-slate-950"
            >
              Date
            </label>
            <div className="mt-1">
              <input
                name="date"
                type="date"
                required
                className="block w-full rounded-md border-0 py-1.5 text-slate-950 shadow-sm ring-1 ring-inset ring-slate-950 placeholder:text-slate-950 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="startTime"
              className="block text-sm font-medium leading-6 text-slate-950"
            >
              Start Time
            </label>
            <div className="mt-1">
              <input
                name="startTime"
                type="time"
                required
                className="block w-full rounded-md border-0 py-1.5 text-slate-950 shadow-sm ring-1 ring-inset ring-slate-950 placeholder:text-slate-950 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="endTime"
              className="block text-sm font-medium leading-6 text-slate-950"
            >
              End Time
            </label>
            <div className="mt-1">
              <input
                name="endTime"
                type="time"
                required
                className="block w-full rounded-md border-0 py-1.5 text-slate-950 shadow-sm ring-1 ring-inset ring-slate-950 placeholder:text-slate-950 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className=" btn flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTaskForm;
