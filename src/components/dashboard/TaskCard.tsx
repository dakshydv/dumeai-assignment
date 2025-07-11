"use client";
import { useState } from "react";
import { useDashboardStore, Task } from "@/stores/store";
import axios from "axios";
import { useUserStore } from "@/stores/userStore";
import { RecordStringAny } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const { updateTask, deleteTask, toggleTask } = useDashboardStore();
  const { user } = useUserStore();

  const handleSave = async () => {
    if (!user) return;
    try {
      await axios.patch("/api/tasks", {
        userEmail: user.email,
        title: task.title,
        newTitle: title,
        newText: description,
      });
      updateTask(task.id, { title, description });
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description || "");
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!user) return;
    try {
      const config: RecordStringAny = {
        data: { userEmail: user.email, title: task.title },
      };
      await axios.delete("/api/tasks", config);
      deleteTask(task.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow ${
        task.completed ? "opacity-60" : ""
      }`}
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Task title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Task description (optional)"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
            className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <div className="flex-1">
            <h3
              className={`font-medium ${
                task.completed ? "line-through text-gray-500" : "text-gray-900"
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p
                className={`text-sm mt-1 ${
                  task.completed
                    ? "line-through text-gray-400"
                    : "text-gray-600"
                }`}
              >
                {task.description}
              </p>
            )}
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </span>
              <div className="flex space-x-1">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-500 hover:text-blue-700 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
