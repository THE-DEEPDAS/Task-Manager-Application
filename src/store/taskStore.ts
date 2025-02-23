import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, TaskFormData, TaskFilters } from '../types';
import { addDays } from 'date-fns';

interface TaskState {
  tasks: Task[];
  dependencies: Map<string, string[]>;
  addTask: (task: TaskFormData) => Promise<void>;
  removeTask: (taskName: string) => Promise<void>;
  updateTaskStatus: (taskName: string, status: Task['status']) => Promise<void>;
  getTasks: (filters?: TaskFilters) => Task[];
  getOverdueTasks: () => Task[];
  loadTasks: () => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  dependencies: new Map(),

  loadTasks: async () => {
    try {
      const tasksJson = await AsyncStorage.getItem('tasks');
      if (tasksJson) {
        const tasks = JSON.parse(tasksJson);
        set({ tasks });
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  },

  addTask: async (taskData) => {
    const tasks = get().tasks;
    const nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

    if (tasks.some(t => t.task_name === taskData.task_name)) {
      throw new Error("A task with this name already exists");
    }

    const dependencies = taskData.dependencies
      ? taskData.dependencies.split(',').map(d => d.trim()).filter(Boolean)
      : [];
    
    const invalidDeps = dependencies.filter(
      dep => !tasks.some(t => t.task_name === dep)
    );

    if (invalidDeps.length > 0) {
      throw new Error(`Invalid dependencies: ${invalidDeps.join(', ')}`);
    }

    const newTask: Task = {
      id: nextId,
      ...taskData,
      dependencies: dependencies.join(', ') || 'None',
      status: 'Not Started',
      created_at: new Date().toISOString(),
    };

    const updatedTasks = [...tasks, newTask];
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    
    set(state => ({
      tasks: updatedTasks,
      dependencies: new Map(state.dependencies).set(
        taskData.task_name,
        dependencies
      ),
    }));
  },

  removeTask: async (taskName) => {
    const { tasks, dependencies } = get();
    
    const task = tasks.find(t => t.task_name === taskName);
    if (!task) {
      throw new Error(`Task '${taskName}' not found`);
    }

    const dependentTasks = tasks.filter(t => 
      t.dependencies !== 'None' && 
      t.dependencies.split(',').map(d => d.trim()).includes(taskName)
    );

    if (dependentTasks.length > 0) {
      throw new Error(
        `Cannot remove task: The following tasks depend on it: ${
          dependentTasks.map(t => t.task_name).join(', ')
        }`
      );
    }

    const updatedTasks = tasks.filter(t => t.task_name !== taskName);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));

    set(state => ({
      tasks: updatedTasks,
      dependencies: new Map(
        Array.from(state.dependencies.entries()).filter(([key]) => key !== taskName)
      ),
    }));
  },

  updateTaskStatus: async (taskName, newStatus) => {
    const { tasks } = get();
    
    const taskIndex = tasks.findIndex(t => t.task_name === taskName);
    if (taskIndex === -1) {
      throw new Error(`Task '${taskName}' not found`);
    }

    if (newStatus === 'Completed') {
      const task = tasks[taskIndex];
      if (task.dependencies !== 'None') {
        const deps = task.dependencies.split(',').map(d => d.trim());
        const incompleteDeps = deps.filter(dep => {
          const depTask = tasks.find(t => t.task_name === dep);
          return depTask && depTask.status !== 'Completed';
        });

        if (incompleteDeps.length > 0) {
          throw new Error(
            `Cannot mark as completed: Dependent tasks not completed: ${
              incompleteDeps.join(', ')
            }`
          );
        }
      }
    }

    const updatedTasks = tasks.map(task =>
      task.task_name === taskName
        ? { ...task, status: newStatus }
        : task
    );

    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    set({ tasks: updatedTasks });
  },

  getTasks: (filters) => {
    let filteredTasks = get().tasks;

    if (filters) {
      if (filters.category) {
        filteredTasks = filteredTasks.filter(task =>
          task.category.toLowerCase().includes(filters.category!.toLowerCase())
        );
      }

      if (filters.min_priority) {
        filteredTasks = filteredTasks.filter(task =>
          task.priority >= filters.min_priority!
        );
      }

      if (filters.status && filters.status !== 'All') {
        filteredTasks = filteredTasks.filter(task =>
          task.status === filters.status
        );
      }
    }

    return filteredTasks;
  },

  getOverdueTasks: () => {
    const now = new Date();
    return get().tasks.filter(task => {
      const deadlineDate = addDays(new Date(), parseInt(task.deadline));
      return deadlineDate < now && task.status !== 'Completed';
    });
  },
}));