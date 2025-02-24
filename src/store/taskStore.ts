import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, TaskFilters } from '../types';
import { addDays } from 'date-fns';

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'status'>) => Promise<void>;
  updateTaskStatus: (taskName: string, status: Task['status']) => Promise<void>;
  removeTask: (taskName: string) => Promise<void>;
  getTasks: (filters: TaskFilters) => Task[];
  getOverdueTasks: () => Task[];
  loadTasks: () => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],

  loadTasks: async () => {
    try {
      const tasksJson = await AsyncStorage.getItem('tasks');
      if (tasksJson) {
        set({ tasks: JSON.parse(tasksJson) });
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  },

  addTask: async (task) => {
    try {
      const newTask: Task = {
        id: Date.now(),
        ...task,
        status: 'Not Started'
      };

      const updatedTasks = [...get().tasks, newTask];
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      
      set(state => ({
        tasks: [...state.tasks, newTask]
      }));
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  },

  updateTaskStatus: async (taskName, status) => {
    try {
      const updatedTasks = get().tasks.map(task =>
        task.task_name === taskName ? { ...task, status } : task
      );
      
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      
      set({ tasks: updatedTasks });
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  removeTask: async (taskName) => {
    try {
      const updatedTasks = get().tasks.filter(task => task.task_name !== taskName);
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      
      set({ tasks: updatedTasks });
    } catch (error) {
      console.error('Error removing task:', error);
      throw error;
    }
  },

  getTasks: (filters) => {
    const { tasks } = get();
    return tasks.filter(task => {
      if (filters.status && filters.status !== 'All' && task.status !== filters.status) return false;
      if (filters.category && !task.category.toLowerCase().includes(filters.category.toLowerCase())) return false;
      if (filters.min_priority && task.priority < filters.min_priority) return false;
      return true;
    });
  },

  getOverdueTasks: () => {
    const { tasks } = get();
    const today = new Date();
    return tasks.filter(task => {
      const deadline = addDays(new Date(), parseInt(task.deadline));
      return deadline < today && task.status !== 'Completed';
    });
  },
}));

// Initialize tasks when the app starts
useTaskStore.getState().loadTasks();