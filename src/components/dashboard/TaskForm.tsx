"use client";
import { useState } from "react";
import { useDashboardStore } from "@/stores/store";
import { useUserStore } from "@/stores/userStore";
import axios from "axios";

interface TaskFormProps {
  onClose: () => void;
}

export function TaskForm({ onClose }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { addTask } = useDashboardStore();
  const { user } = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !user) return;

    await axios.post("/api/tasks", {
      userEmail: user.email,
      title,
      text: description,
    });

    addTask({
      title: title.trim(),
      description: description.trim() || undefined,
      completed: false,
      userId: user.id,
    });

    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Create New Task
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description (optional)"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Create Task
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
