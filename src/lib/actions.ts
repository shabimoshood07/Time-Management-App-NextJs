"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Task from "@/model/task";
import { Session, getServerSession } from "next-auth";
import { connectDB } from "./connectDB";
import { revalidatePath } from "next/cache";
import User from "@/model/user";

type PWH = {
  day: string;
  startTime: string;
  endTime: string;
};

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
    throw new Error(error.message || "Internal server error");
  }
};

export const getTask = async (taskId: string, userId: string) => {
  const task = await Task.findOne({ _id: taskId, user: userId });
  return JSON.parse(JSON.stringify({ task }));
};

export const updateTask = async (taskId: string, formdata: FormData) => {
  try {
    const description = formdata.get("description");
    const date = formdata.get("date");
    const startTime = formdata.get("startTime");
    const endTime = formdata.get("endTime");

    const task = await Task.findOneAndUpdate(
      { _id: taskId },
      {
        description,
        date,
        startTime,
        endTime,
      }
    );
    revalidatePath("/showtask")
    return JSON.parse(JSON.stringify({ message: "Task updated" }));
  } catch (error: any) {
    throw new Error("Something went wrong");
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
    throw new Error(error.message || "Something went wrong");
  }
};

export const addPreferredWorkingHour = async (
  formdata: FormData,
  userId: string
) => {
  try {
    const day = formdata.get("day");
    const startTime = formdata.get("startTime");
    const endTime = formdata.get("endTime");

    var startDate = new Date("1970-01-01T" + startTime);
    var endDate = new Date("1970-01-01T" + endTime);

    if (endDate < startDate) {
      throw new Error("End time must be after start time");
    }

    await connectDB();
    const user = await User.findOne({ _id: userId });

    if (!user) throw new Error("No User found");

    const dayAlreadyExists = user.preferredWorkingHours.find(
      (PWH: PWH) => PWH.day === day
    );

    if (dayAlreadyExists) {
      const updatedWorkingHours = user.preferredWorkingHours.map((PWH: PWH) => {
        if (PWH.day === day) {
          return { ...PWH, startTime, endTime };
        }
        return PWH;
      });

      await User.findOneAndUpdate(
        { _id: userId },
        { preferredWorkingHours: updatedWorkingHours }
      );
      revalidatePath("/profile/settings");
      return JSON.parse(
        JSON.stringify({ message: "Settings updated successfully" })
      );
    }

    const data = { day, startTime, endTime };

    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { preferredWorkingHours: data } }
    );
    revalidatePath("/profile/settings");
    return JSON.parse(
      JSON.stringify({ message: "Settings added successfully" })
    );
  } catch (error: any) {
    // throw new Error(
    //   JSON.parse(JSON.stringify(error.message || "Something went wrong"))
    // );

    // return new Error(error);
    throw new Error(error.message || "Something went wrong");
  }
};

export const getUserPreferredWorkingHour = async (session: Session) => {
  try {
    const user = await User.findOne({ _id: session.user.id });
    const preferredWorkingHour = user.preferredWorkingHours;

    if (preferredWorkingHour.length > 0) {
      const dayOrder = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ];

      preferredWorkingHour.sort((a: { day: string }, b: { day: string }) => {
        const dayA = a.day.toLowerCase();
        const dayB = b.day.toLowerCase();

        const indexA = dayOrder.indexOf(dayA);
        const indexB = dayOrder.indexOf(dayB);

        return indexA - indexB;
      });
    }

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

export const getPreferredWorkingHour = async (day: string, userId: string) => {
  try {
    const user = await User.findOne({ _id: userId });

    const data = user.preferredWorkingHours.filter(
      (PHW: PWH) => PHW.day === day
    );
    return JSON.parse(JSON.stringify(data[0]));
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const updatePreferredWorkingHour = async (
  formdata: FormData,
  userId: string
) => {
  try {
    const day = formdata.get("day");
    const startTime = formdata.get("startTime");
    const endTime = formdata.get("endTime");

    var startDate = new Date("1970-01-01T" + startTime);
    var endDate = new Date("1970-01-01T" + endTime);

    if (endDate < startDate) {
      throw new Error("End time must be after start time");
    }
    await connectDB();
    const user = await User.findOne({ _id: userId });

    if (!user) throw new Error("No User found");

    const updatedWorkingHours = user.preferredWorkingHours.map((PWH: PWH) => {
      if (PWH.day === day) {
        return { ...PWH, startTime, endTime };
      }
      return PWH;
    });

    await User.findOneAndUpdate(
      { _id: userId },
      { preferredWorkingHours: updatedWorkingHours }
    );
    revalidatePath("/profile/settings");
    return JSON.parse(
      JSON.stringify({ message: "Settings updated successfully" })
    );
  } catch (error: any) {
    throw new Error(error.message || "Internal server error");
  }
};
