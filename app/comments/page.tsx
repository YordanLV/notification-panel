"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import LoadingSkeleton from "@/components/LoadingSkeleton";

const NotificationPanel = dynamic(
  () => import("../../components/NotificationPanel"),
  {
    ssr: false,
  }
);

interface CommentNotification {
  id: string;
  type: string;
  message: string;
  createdAt: string;
  userName?: string;
}

export default function CommentsPage() {
  const [comments, setComments] = useState<CommentNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchComments() {
      setIsLoading(true);
      try {
        const response = await fetch("/api/notifications?type=Comment Tag");
        if (response.ok) {
          const data: CommentNotification[] = await response.json();
          setComments(data);
        } else {
          console.error("Failed to fetch comments");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchComments();
  }, []);

  return (
    <main className="relative min-h-screen p-24 bg-black text-gray-200">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        Comment Notifications
      </h1>
      <div className="absolute top-4 right-4">
        <NotificationPanel />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-300">
          Comment Tags
        </h2>
        {isLoading ? (
          <div className="space-y-4">
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </div>
        ) : (
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="border border-gray-700 p-4 rounded-lg bg-gray-900 shadow-lg hover:bg-gray-800 transition-colors duration-200"
              >
                <h3 className="font-bold text-blue-400">{comment.type}</h3>
                <p className="text-gray-300 mt-2">{comment.message}</p>
                {comment.userName && (
                  <p className="text-sm text-gray-400 mt-2">
                    By: {comment.userName}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
