import { addTask } from "@/lib/actions";

const AddTask = () => {
  return (
    <div>
      <form action={addTask}>
        <div>
          <label htmlFor="description">Description</label>
          <textarea required name="description" />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input type="date" required name="date" />
        </div>
        <div>
          <label htmlFor="startTime">Start Time</label>
          <input type="time" required name="startTime" />
        </div>
        <div>
          <label htmlFor="endTime">End Time</label>
          <input type="time" required name="endTime" />
        </div>
        <button type="submit">Add task</button>
      </form>
    </div>
  );
};

export default AddTask;
