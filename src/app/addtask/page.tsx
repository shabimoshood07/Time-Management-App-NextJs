import AddTaskForm from "@/component/AddTaskForm";
import BackButton from "@/component/BackButton";
import { addTask } from "@/lib/actions";

const AddTask = () => {
  return (
    <div className="flex min-h-full flex-col justify-center px-6  lg:px-8">
      <AddTaskForm addTask={addTask} />
    </div>
  );
};

export default AddTask;
