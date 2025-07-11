"use client";
import { useUserStore } from "@/stores/userStore";
import { useDashboardStore, Note, Task } from "@/stores/store";
import { DashboardHeader } from "./DashboardHeading";
import { DashboardTabs } from "./DashboardTabs";
import { NotesSection } from "./notesSection";
import { TasksSection } from "./TasksSection";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import axios from "axios";

export function Dashboard() {
  const { data: session, status } = useSession();
  const { user, isAuthenticated, setUser, setIsAuthenticated } = useUserStore();
  const { activeTab, clearData, setNotes, setTasks } = useDashboardStore();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUser(session.user);
      setIsAuthenticated(true);
    } else if (status === "unauthenticated") {
      setIsAuthenticated(false);
      clearData();
    }
  }, [session, status, setUser, setIsAuthenticated, clearData]);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && user?.email) {
        try {
          const [notesRes, tasksRes] = await Promise.all([
            axios.get(`/api/notes?userEmail=${encodeURIComponent(user.email)}`),
            axios.get(`/api/tasks?userEmail=${encodeURIComponent(user.email)}`),
          ]);
          const notesData = notesRes.data as { notes: Note[] };
          const tasksData = tasksRes.data as { tasks: Task[] };
          const notes = (notesData.notes || []).map((n) => ({
            id: (n as any)._id || n.id,
            title: n.title,
            content: (n as any).text || n.content || "",
            createdAt: n.createdAt || "",
            updatedAt: n.updatedAt || "",
            userId: user.id,
          }));
          const tasks = (tasksData.tasks || []).map((t) => ({
            id: (t as any)._id || t.id,
            title: t.title,
            description: (t as any).text || t.description || "",
            completed: t.completed || false,
            createdAt: t.createdAt || "",
            updatedAt: t.updatedAt || "",
            userId: user.id,
          }));
          setNotes(notes);
          setTasks(tasks);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchData();
  }, [isAuthenticated, user, setNotes, setTasks]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
          <p className="text-gray-600 mt-2">
            Please log in to access your dashboard
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <DashboardTabs />
          <div className="p-6">
            {activeTab === "notes" ? <NotesSection /> : <TasksSection />}
          </div>
        </div>
      </div>
    </div>
  );
}
