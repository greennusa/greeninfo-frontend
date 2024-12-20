"use client"

import { useServerData } from "../hooks/useServerData"
import { ServerCard } from "./components/ServerCard"
import ErrorBoundary from "./components/ErrorBoundary"

export default function Dashboard() {
  const servers = useServerData();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Multi-Server Monitor Dashboard</h1>
      {servers.length === 0 ? (
        <div className="text-center">Loading server data...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {servers.map((server) => (
            server ? (
              <ErrorBoundary key={server.url}>
                <ServerCard server={server} />
              </ErrorBoundary>
            ) : null
          ))}
        </div>
      )}
    </div>
  )
}

