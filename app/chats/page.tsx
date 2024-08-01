"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import LoadingSkeleton from "@/components/LoadingSkeleton";

const NotificationPanel = dynamic(
  () => import("../../components/NotificationPanel"),
  { ssr: false }
);

interface AccessGrant {
  id: string;
  message: string;
  userName: string;
  createdAt: string;
}

export default function AccessGrantedPage() {
  const [accessGrants, setAccessGrants] = useState<AccessGrant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAccessGrants() {
      setIsLoading(true);
      try {
        const response = await fetch("/api/notifications?type=Access granted");
        if (response.ok) {
          const data: AccessGrant[] = await response.json();
          setAccessGrants(data);
        } else {
          console.error("Failed to fetch access grants");
        }
      } catch (error) {
        console.error("Error fetching access grants:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAccessGrants();
  }, []);

  return (
    <main className="relative min-h-screen p-24 bg-black text-gray-200">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        Access Granted
      </h1>
      <div className="absolute top-4 right-4">
        <NotificationPanel />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-300">
          Access Grants
        </h2>
        {isLoading ? (
          <div className="space-y-4">
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </div>
        ) : (
          <ul className="space-y-4">
            {accessGrants.map((grant) => (
              <li
                key={grant.id}
                className="border border-gray-700 p-4 rounded-lg bg-gray-900 shadow-lg hover:bg-gray-800 transition-colors duration-200"
              >
                <h3 className="font-bold text-blue-400">{grant.message}</h3>
                <p className="text-gray-300 mt-2">
                  Granted by: {grant.userName}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(grant.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
