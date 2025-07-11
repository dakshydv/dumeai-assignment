import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface DashboardState {
  notes: Note[];
  tasks: Task[];
  activeTab: "notes" | "tasks";
  isLoading: boolean;
  addNote: (note: Omit<Note, "id" | "createdAt" | "updatedAt">) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  setNotes: (notes: Note[]) => void;
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
  setActiveTab: (tab: "notes" | "tasks") => void;
  setLoading: (loading: boolean) => void;
  clearData: () => void;
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      notes: [],
      tasks: [],
      activeTab: "notes",
      isLoading: false,
      addNote: (noteData) => {
        const note: Note = {
          ...noteData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ notes: [...state.notes, note] }));
      },
      updateNote: (id, updates) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, ...updates, updatedAt: new Date().toISOString() }
              : note
          ),
        }));
      },
      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        }));
      },
      setNotes: (notes) => set({ notes }),
      addTask: (taskData) => {
        const task: Task = {
          ...taskData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ tasks: [...state.tasks, task] }));
      },
      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, ...updates, updatedAt: new Date().toISOString() }
              : task
          ),
        }));
      },
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },
      toggleTask: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  completed: !task.completed,
                  updatedAt: new Date().toISOString(),
                }
              : task
          ),
        }));
      },
      setTasks: (tasks) => set({ tasks }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      setLoading: (loading) => set({ isLoading: loading }),
      clearData: () => set({ notes: [], tasks: [] }),
    }),
    {
      name: "dashboard-storage",
      partialize: (state) => ({
        notes: state.notes,
        tasks: state.tasks,
        activeTab: state.activeTab,
      }),
    }
  )
);
