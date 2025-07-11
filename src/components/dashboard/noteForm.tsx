"use client";
import { useState } from "react";
import { useDashboardStore } from "@/stores/store";
import { useUserStore } from "@/stores/userStore";
import axios from "axios";

interface NoteFormProps {
  onClose: () => void;
}

export function NoteForm({ onClose }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { addNote } = useDashboardStore();
  const { user } = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !user) return;
    await axios.post("/api/notes", {
      userEmail: user.email,
      title,
      text: content,
    });
    addNote({
      title: title.trim(),
      content: content.trim(),
      userId: user.id,
    });
    setTitle("");
    setContent("");
    onClose();
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Create New Note
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Create Note
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
