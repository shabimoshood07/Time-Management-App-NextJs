"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { getTask, updateTask } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
const EditTaskForm = ({ taskId }: { taskId: string }) => {
  const { data } = useSession();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const setFormData = async () => {
    setFormLoading(true);
    const { task } = await getTask(taskId, data?.user.id as string);
    setEndTime(task.endTime);
    setStartTime(task.startTime);
    setDescription(task.description);
    setDate(task.date);
    setFormLoading(false);
  };

  useEffect(() => {
    setFormData();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    try {
      const res = await updateTask(taskId, formData);
      if (res) {
        toast({
          title: "successful",
          description: res.message,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  if (formLoading)
    return (
      <div className="w-full flex justify-center">
        <Skeleton className="h-28 w-28 flex justify-center items-center rounded-full bg-yellow-500">
          <h1 className="text-slate-950">Loading...</h1>
        </Skeleton>
      </div>
    );

  return (
    <form className="space-y-4" action={handleSubmit}>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium leading-6 text-slate-200"
        >
          Description
        </label>
        <div className="mt-1">
          <textarea
            name="description"
            rows={5}
            required
            className="block w-full rounded-md border-0 py-1.5 text-slate-950 shadow-sm ring-1 ring-inset ring-slate-950 placeholder:text-slate-950 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
            defaultValue={description}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium leading-6 text-slate-200"
        >
          Date
        </label>
        <div className="mt-1">
          <input
            name="date"
            type="date"
            required
            className="block w-full rounded-md border-0 py-1.5 text-slate-950 shadow-sm ring-1 ring-inset ring-slate-950 placeholder:text-slate-950 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
            value={date}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="startTime"
          className="block text-sm font-medium leading-6 text-slate-200"
        >
          Start Time
        </label>
        <div className="mt-1">
          <input
            name="startTime"
            type="time"
            required
            className="block w-full rounded-md border-0 py-1.5 text-slate-950 shadow-sm ring-1 ring-inset ring-slate-950 placeholder:text-slate-950 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
            defaultValue={startTime}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="endTime"
          className="block text-sm font-medium leading-6 text-slate-200"
        >
          End Time
        </label>
        <div className="mt-1">
          <input
            name="endTime"
            type="time"
            required
            className="block w-full rounded-md border-0 py-1.5 text-slate-950 shadow-sm ring-1 ring-inset ring-slate-950 placeholder:text-slate-950 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
            defaultValue={endTime}
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          className=" btn !bg-yellow-500 !text-slate-950 flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
