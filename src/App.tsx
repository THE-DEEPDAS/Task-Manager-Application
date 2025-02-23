import React, { useState } from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { OverdueTasks } from './components/OverdueTasks';
import { DependencyGraph } from './components/DependencyGraph';
import { ListTodo, BarChart2, Clock } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'graph'>('tasks');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <ListTodo className="w-8 h-8" />
            Task Manager
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
              <TaskForm />
            </div>

            <div className="mt-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Overdue Tasks
                </h2>
                <OverdueTasks />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="border-b border-gray-200">
                <nav className="flex" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab('tasks')}
                    className={`
                      px-6 py-4 text-sm font-medium
                      ${activeTab === 'tasks'
                        ? 'border-b-2 border-indigo-500 text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <ListTodo className="w-5 h-5 inline-block mr-2" />
                    Tasks
                  </button>
                  <button
                    onClick={() => setActiveTab('graph')}
                    className={`
                      px-6 py-4 text-sm font-medium
                      ${activeTab === 'graph'
                        ? 'border-b-2 border-indigo-500 text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <BarChart2 className="w-5 h-5 inline-block mr-2" />
                    Dependencies
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'tasks' ? (
                  <TaskList />
                ) : (
                  <DependencyGraph />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;