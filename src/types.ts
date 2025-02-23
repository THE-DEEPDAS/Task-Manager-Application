export interface Task {
  id: number;
  task_name: string;
  category: string;
  priority: number;
  deadline: string;
  dependencies: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  created_at: string;
}

export interface TaskFormData {
  task_name: string;
  category: string;
  priority: number;
  deadline: string;
  dependencies: string;
}

export interface TaskFilters {
  category?: string;
  min_priority?: number;
  status?: 'All' | 'Not Started' | 'In Progress' | 'Completed';
}