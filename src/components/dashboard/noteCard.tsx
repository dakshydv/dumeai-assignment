"use client";
import { useState } from "react";
import { useDashboardStore, Note } from "@/stores/store";
import axios from "axios";
import { useUserStore } from "@/stores/userStore";
import { RecordStringAny } from "@/lib/utils";

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const { updateNote, deleteNote } = useDashboardStore();
  const { user } = useUserStore();

  const handleSave = async () => {
    if (!user) return;
    try {
      await axios.patch("/api/notes", {
        userEmail: user.email,
        title: note.title,
        newTitle: title,
        newText: content,
      });
      updateNote(note.id, { title, content });
      setIsEditing(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!user) return;
    try {
      const config: RecordStringAny = {
        data: { userEmail: user.email, title: note.title },
      };
      await axios.delete("/api/notes", config);
      deleteNote(note.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Note title"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Note content"
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
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-gray-900 line-clamp-1">
              {note.title}
            </h3>
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
          <p className="text-gray-600 text-sm line-clamp-3 mb-3">
            {note.content}
          </p>
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>
              Created: {new Date(note.createdAt).toLocaleDateString()}
            </span>
            <button className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
              Summarize with AI
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
