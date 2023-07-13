"use client";
import { toast } from "@/components/ui/use-toast";
import {
  getPreferredWorkingHour,
  updatePreferredWorkingHour,
} from "@/lib/actions";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
type Props = {
  day: string;
  userId: string;
};
const EditPreferredWorkingHourForm = ({ day, userId }: Props) => {
  const router = useRouter();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const setFormData = async () => {
    const data = await getPreferredWorkingHour(day, userId);
    setEndTime(data.endTime);
    setStartTime(data.startTime);
  };

  useEffect(() => {
    setFormData();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    try {
      const res = await updatePreferredWorkingHour(formData, userId);
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

  return (
    <form className="space-y-4" action={handleSubmit} autoComplete="off">
      <div>
        <label
          htmlFor="day"
          className="block text-sm font-medium leading-6 text-slate-200"
        >
          Day
        </label>
        <div className="mt-1">
          <input
            name="day"
            required
            value={day}
            className="block w-full rounded-md border-0 py-1.5 text-slate-950 shadow-sm ring-1 ring-inset ring-slate-950 placeholder:text-slate-950 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6 pl-2"
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
            defaultValue={startTime}
            className="block w-full rounded-md border-0 py-1.5 text-slate-950 shadow-sm ring-1 ring-inset ring-slate-950 placeholder:text-slate-950 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
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
            defaultValue={endTime}
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
          className=" btn !bg-yellow-500 !text-slate-950 flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default EditPreferredWorkingHourForm;
