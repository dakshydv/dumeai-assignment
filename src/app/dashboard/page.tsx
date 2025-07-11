"use client"
import { Dashboard } from "@/components/dashboard/Dashboard";
import { SessionProvider } from "next-auth/react";

export default function DashboardPage() {
  return (
    <div>
      <SessionProvider>
        <Dashboard />
      </SessionProvider>
    </div>
  );
}
