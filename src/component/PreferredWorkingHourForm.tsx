"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

type Props = {
  addPreferredWorkingHour: any;
  id: String;
};

const PreferredWorkingHourForm = ({ addPreferredWorkingHour, id }: Props) => {
  const handleSubmit = async (formdata: FormData) => {
    try {
      const res = await addPreferredWorkingHour(formdata, id);
      toast({
        title: "Success",
        description: res.message,
      });
      console.log(res);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "something went wrong",
      });
    }
  };
  return (
    <div className=" w-full md:flex-1">
      <h1 className="mb-2">Set Preffered working hour</h1>
      <form className="space-y-4 " autoComplete="off" action={handleSubmit}>
        <div>
          <Select name="day">
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
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PreferredWorkingHourForm;
