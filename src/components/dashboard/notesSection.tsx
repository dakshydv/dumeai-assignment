"use client";
import { useState } from "react";
import { useDashboardStore } from "@/stores/store";
import { useUserStore } from "@/stores/userStore";
import { NoteCard } from "./noteCard";
import { NoteForm } from "./noteForm";

export function NotesSection() {
  const [showForm, setShowForm] = useState(false);
  const { notes } = useDashboardStore();
  const { user } = useUserStore();

  const userNotes = notes.filter((note) => note.userId === user?.id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">My Notes</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Note
        </button>
      </div>

      {showForm && <NoteForm onClose={() => setShowForm(false)} />}

      {userNotes.length === 0 ? (
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No notes yet
          </h3>
          <p className="text-gray-500 mb-4">
            Create your first note to get started
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Create Note
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {userNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}
