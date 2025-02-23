import React from "react";
import { useTaskStore } from "../store/taskStore";
import { format, addDays } from "date-fns";

export function OverdueTasks() {
  const overdueTasks = useTaskStore((state) => state.getOverdueTasks());

  if (overdueTasks.length === 0) {
    return (
      <div className="bg-green-50 p-4 rounded-md">
        <p className="text-green-700">No overdue tasks!</p>
      </div>
    );
  }

  return (
    <div className="bg-red-50 p-4 rounded-md">
      <h3 className="text-lg font-medium text-red-800 mb-2">Overdue Tasks</h3>
      <ul className="space-y-2">
        {overdueTasks.map((task) => (
          <li key={task.id} className="text-red-700">
            {task.task_name} - Due:{" "}
            {format(addDays(new Date(), parseInt(task.deadline)), "PP")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OverdueTasks;
