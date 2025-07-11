'use client'
import { useDashboardStore } from "@/stores/store"

export function DashboardTabs() {
  const { activeTab, setActiveTab, notes, tasks } = useDashboardStore()

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8" aria-label="Tabs">
        <button
          onClick={() => setActiveTab('notes')}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'notes'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Notes ({notes.length})
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'tasks'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Tasks ({tasks.length})
        </button>
      </nav>
    </div>
  )
}
