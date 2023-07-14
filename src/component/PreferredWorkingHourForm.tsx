"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { addPreferredWorkingHour } from "@/lib/actions";
import { useRef, useState } from "react";

type Props = {
  userId: string;
};

const PreferredWorkingHourForm = ({ userId }: Props) => {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formdata: FormData) => {
    setLoading(true);
    try {
      const res = await addPreferredWorkingHour(formdata, userId);
      toast({
        title: "Success",
        description: res.message,
      });
      if (form.current) {
        form.current.reset();
      }
    } catch (error: any) {
      console.log(error);

      toast({
        variant: "destructive",
        title: "Error",
        description: error.error || "something went wrong",
      });
    }
    setLoading(false);
  };
  return (
    <div className=" w-full md:flex-1">
      <h1 className="mb-2">Set Preffered working hour</h1>
      <form
        className="space-y-4 "
        ref={form}
        autoComplete="off"
        action={handleSubmit}
      >
        <div>
          <Select name="day" required>
            <SelectTrigger className="w-[180px]  rounded-md py-1.5 text-slate-950 shadow-sm ring-1 ring-inset ring-slate-950 placeholder:text-slate-950 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6">
              <SelectValue placeholder="Day" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 text-yellow-500">
              <SelectItem value="monday">monday</SelectItem>
              <SelectItem value="tuesday">tuesday</SelectItem>
              <SelectItem value="wednesday">wednesday</SelectItem>
              <SelectItem value="thursday">thursday</SelectItem>
              <SelectItem value="friday">friday</SelectItem>
              <SelectItem value="saturday">saturday</SelectItem>
              <SelectItem value="sunday">sunday</SelectItem>
            </SelectContent>
          </Select>

          <div className="mt-1"></div>
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

        <button
          type="submit"
          className=" btn flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          disabled={loading}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PreferredWorkingHourForm;
