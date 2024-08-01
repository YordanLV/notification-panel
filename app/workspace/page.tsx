"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import LoadingSkeleton from "@/components/LoadingSkeleton";

const NotificationPanel = dynamic(
  () => import("../../components/NotificationPanel"),
  { ssr: false }
);

interface JoinEvent {
  id: string;
  message: string;
  userName: string;
  createdAt: string;
}

export default function JoinWorkspacePage() {
  const [joinEvents, setJoinEvents] = useState<JoinEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchJoinEvents() {
      setIsLoading(true);
      try {
        const response = await fetch("/api/notifications?type=Join workspace");
        if (response.ok) {
          const data: JoinEvent[] = await response.json();
          setJoinEvents(data);
        } else {
          console.error("Failed to fetch join workspace events");
        }
      } catch (error) {
        console.error("Error fetching join workspace events:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchJoinEvents();
  }, []);

  return (
    <main className="relative min-h-screen p-24 bg-black text-gray-200">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        Join Workspace
      </h1>
      <div className="absolute top-4 right-4">
        <NotificationPanel />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-300">
          Workspace Join Events
        </h2>
        {isLoading ? (
          <div className="space-y-4">
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </div>
        ) : (
          <ul className="space-y-4">
            {joinEvents.map((event) => (
              <li
                key={event.id}
                className="border border-gray-700 p-4 rounded-lg bg-gray-900 shadow-lg hover:bg-gray-800 transition-colors duration-200"
              >
                <h3 className="font-bold text-blue-400">{event.message}</h3>
                <p className="text-gray-300 mt-2">User: {event.userName}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(event.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
