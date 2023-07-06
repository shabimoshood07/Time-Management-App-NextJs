"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Task from "@/model/task";
import { getServerSession } from "next-auth";
import { connectDB } from "./connectDB";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addTask = async (formdata: FormData) => {
  console.log(formdata);
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

// export const handleDeleteTask1 = async (
//   id: string,
//   user: string | undefined
// ) => {
//   await connectDB();
//   try {
//     const deleteTask = await Task.findOneAndDelete({
//       _id: id,
//       user,
//     });
//     redirect("/showtask");
//   } catch (error: any) {
//     console.log(error);
//     return JSON.parse(JSON.stringify(error.message));
//   }
// };
