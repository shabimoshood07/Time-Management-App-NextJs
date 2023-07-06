"use client";

import { toast } from "@/components/ui/use-toast";
import { handleDeleteTask } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
const DeleteTaskButton = ({ id }: { id: string }) => {
  const { data } = useSession();
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const deleteTask = await handleDeleteTask(id, data?.user.id);
      if (deleteTask) {
        toast({
          title: "Successful",
          description: "Task deleted successfully",
        });
      }
      //   redirect("/showtask");
      router.push("/showtask");
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    }
  };

  return (
    <button onClick={handleDelete} className="hover:scale-125 duration-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6 "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
        />
      </svg>
    </button>
  );
};

export default DeleteTaskButton;
