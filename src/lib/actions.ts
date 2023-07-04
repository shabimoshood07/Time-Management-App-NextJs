"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Task from "@/model/task";
import { getServerSession } from "next-auth";
import { connectDB } from "./connectDB";
import { revalidatePath } from "next/cache";

export const addTask = async (formdata: FormData) => {
    await connectDB()
  const session = await getServerSession(authOptions);
  const description = formdata.get("description");
  const date = formdata.get("date");
  const startTime = formdata.get("startTime");
  const endTime = formdata.get("endTime");

  var startDate = Number(new Date("1970-01-01T" + startTime));
  var endDate = Number(new Date("1970-01-01T" + endTime));

  var duration = (endDate - startDate) as number;
  // Convert milliseconds to hours
  var durationInHours = duration / (1000 * 60 * 60);

  // Check if end time is before start time
  if (durationInHours < 0) {
    throw new Error("End time cannot be before start time!");
  }

  const newTask = await Task.create({
    description,
    date,
    startTime,
    endTime,
    duration: durationInHours,
    user: session?.user.id,
  });
  revalidatePath('/showtask')
};
