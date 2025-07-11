"use client";
import { useState } from "react";
import { useDashboardStore } from "@/stores/store";
import { useUserStore } from "@/stores/userStore";
import { TaskCard } from "./TaskCard";
import { TaskForm } from "./TaskForm";

export function TasksSection() {
  const [showForm, setShowForm] = useState(false);
  const { tasks } = useDashboardStore();
  const { user } = useUserStore();

  const userTasks = tasks.filter((task) => task.userId === user?.id);
  const completedTasks = userTasks.filter((task) => task.completed);
  const pendingTasks = userTasks.filter((task) => !task.completed);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">My Tasks</h2>
          <p className="text-sm text-gray-500">
            {pendingTasks.length} pending, {completedTasks.length} completed
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Add Task
        </button>
      </div>

      {showForm && <TaskForm onClose={() => setShowForm(false)} />}

      {userTasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No tasks yet
          </h3>
          <p className="text-gray-500 mb-4">
            Create your first task to get started
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Create Task
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingTasks.length > 0 && (
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-3">
                Pending Tasks
              </h3>
              <div className="space-y-2">
                {pendingTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}

          {completedTasks.length > 0 && (
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-3">
                Completed Tasks
              </h3>
              <div className="space-y-2">
                {completedTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
