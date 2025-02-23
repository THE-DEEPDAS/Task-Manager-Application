import React, { useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { TaskFilters } from '../types';
import { format, addDays } from 'date-fns';

export function TaskList() {
  const [filters, setFilters] = useState<TaskFilters>({
    status: 'All',
  });

  const tasks = useTaskStore(state => state.getTasks(filters));
  const updateTaskStatus = useTaskStore(state => state.updateTaskStatus);
  const removeTask = useTaskStore(state => state.removeTask);

  const handleStatusChange = (taskName: string, status: 'Not Started' | 'In Progress' | 'Completed') => {
    try {
      updateTaskStatus(taskName, status);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleRemoveTask = (taskName: string) => {
    try {
      removeTask(taskName);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Filter by category..."
          onChange={(e) => setFilters(f => ({ ...f, category: e.target.value }))}
          className="px-3 py-2 border rounded-md"
        />
        <input
          type="number"
          placeholder="Min priority..."
          onChange={(e) => setFilters(f => ({ ...f, min_priority: e.target.value ? Number(e.target.value) : undefined }))}
          className="px-3 py-2 border rounded-md"
        />
        <select
          onChange={(e) => setFilters(f => ({ ...f, status: e.target.value as TaskFilters['status'] }))}
          className="px-3 py-2 border rounded-md"
        >
          <option value="All">All Status</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{task.task_name}</div>
                  {task.dependencies !== 'None' && (
                    <div className="text-sm text-gray-500">
                      Dependencies: {task.dependencies}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.priority}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(addDays(new Date(), parseInt(task.deadline)), 'PP')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(
                      task.task_name,
                      e.target.value as 'Not Started' | 'In Progress' | 'Completed'
                    )}
                    className="text-sm text-gray-900 border rounded-md px-2 py-1"
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleRemoveTask(task.task_name)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}