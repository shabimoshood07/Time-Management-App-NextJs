"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Task from "@/model/task";
import { Session, getServerSession } from "next-auth";
import { connectDB } from "./connectDB";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import User from "@/model/user";

export const getSession = async () => {
  await connectDB();
  return await getServerSession(authOptions);
};

export const addTask = async (formdata: FormData) => {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    const description = formdata.get("description");
    const date = formdata.get("date");
    const startTime = formdata.get("startTime");
    const endTime = formdata.get("endTime");

    var startDate = new Date("1970-01-01T" + startTime);
    var endDate = new Date("1970-01-01T" + endTime);
    if (endDate < startDate) {
      endDate.setDate(endDate.getDate() + 1);
    }
    var duration = (Number(endDate) - Number(startDate)) as number;
    var durationInHours = duration / (1000 * 60 * 60);
    const newTask = await Task.create({
      description,
      date,
      startTime,
      endTime,
      duration: durationInHours,
      user: session?.user.id,
    });
    revalidatePath("/showtask");
    return JSON.parse(JSON.stringify({ newTask }));
  } catch (error: any) {
    throw new Error(error.message || "Internal server error", {});
  }
};

export const handleDeleteTask = async (
  id: string,
  user: string | undefined
) => {
  await connectDB();
  try {
    const deleteTask = await Task.findOneAndDelete({
      _id: id,
      user,
    });
    revalidatePath("/showtask");
    return JSON.parse(JSON.stringify({ message: "task deleted successfully" }));
  } catch (error: any) {
    console.log(error);
    return JSON.parse(JSON.stringify(error.message));
  }
};

export const addPreferredWorkingHour = async (formdata: FormData) => {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");
  const user = await User.findOne({ _id: session.user.id });
  if (!user) throw new Error("No User found");

  const day = formdata.get("day");
  const startTime = formdata.get("startTime");
  const endTime = formdata.get("endTime");

  var startDate = new Date("1970-01-01T" + startTime);
  var endDate = new Date("1970-01-01T" + endTime);

  if (endDate < startDate) {
    throw new Error("End time must be after start time");
  }
  const data = { day, startTime, endTime };

  try {
    await User.findOneAndUpdate(
      { _id: session.user.id },
      { $push: { preferredWorkingHours: data } }
    );
    revalidatePath("/profile/settings");
    return JSON.parse(
      JSON.stringify({ message: "Settings added successfully" })
    );
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const getUserPreferredWorkingHour = async (session: Session) => {
  try {
    const user = await User.findOne({ _id: session.user.id });
    const preferredWorkingHour = user.preferredWorkingHours;
    return JSON.parse(JSON.stringify(preferredWorkingHour));
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const deletePreferredWorkingHour = async (day: string, id: string) => {
  await connectDB();
  // const session = await getServerSession(authOptions);
  try {
    const user = await User.findOne({ _id: id });
    const preferredWorkingHour = user.preferredWorkingHours;
    await User.findOneAndUpdate(
      { _id: id },
      { $pull: { preferredWorkingHours: { day: day } } }
    );
    revalidatePath("/profile/settings");
    return JSON.parse(JSON.stringify(preferredWorkingHour));
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};
