"use client";
import { signOut } from "next-auth/react";
import { useUserStore } from "@/stores/userStore";
import { useDashboardStore } from "@/stores/store";
import { useRouter } from "next/navigation";

export function DashboardHeader() {
  const { user, clearUser } = useUserStore();
  const { notes, tasks } = useDashboardStore();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    clearUser();
    router.push("/");
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">My Workspace</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>{notes.length} notes</span>
              <span>{tasks.length} tasks</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div>
                <p className="text-sm font-medium text-gray-900"></p>
                {user?.email && (
                  <p className="text-xs text-gray-500">{user.email}</p>
                )}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
