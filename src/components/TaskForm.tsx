import React from "react";
import { useForm } from "react-hook-form";
import { TaskFormData } from "../types";
import { useTaskStore } from "../store/taskStore";

export function TaskForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>();
  const addTask = useTaskStore((state) => state.addTask);
  const tasks = useTaskStore((state) => state.tasks);

  const onSubmit = (data: TaskFormData) => {
    try {
      addTask(data);
      reset();
    } catch (error) {
      alert(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Task Name
        </label>
        <input
          type="text"
          {...register("task_name", { required: "Task name is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.task_name && (
          <p className="mt-1 text-sm text-red-600">
            {errors.task_name.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          type="text"
          {...register("category", { required: "Category is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Priority (0-100)
        </label>
        <input
          type="number"
          {...register("priority", {
            required: "Priority is required",
            min: { value: 0, message: "Priority must be at least 0" },
            max: { value: 100, message: "Priority must be at most 100" },
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.priority && (
          <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Deadline (days)
        </label>
        <input
          type="number"
          {...register("deadline", {
            required: "Deadline is required",
            min: { value: 1, message: "Deadline must be at least 1 day" },
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {errors.deadline && (
          <p className="mt-1 text-sm text-red-600">{errors.deadline.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Dependencies (comma-separated task names)
        </label>
        <input
          type="text"
          {...register("dependencies")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <p className="mt-1 text-sm text-gray-500">
          Available tasks: {tasks.map((t) => t.task_name).join(", ")}
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add Task
      </button>
    </form>
  );
}
