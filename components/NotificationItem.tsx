import React from "react";
import { useNotifications } from "../context/NotificationContext";
import { useRouter } from "next/navigation";

type NotificationProps = {
  notification: {
    id: string;
    type: string;
    message: string;
    isRead: boolean;
    userName?: string;
    releaseNumber?: string;
  };
};

export default function NotificationItem({ notification }: NotificationProps) {
  const { markAsRead } = useNotifications();
  const router = useRouter();

  const handleClick = () => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }

    switch (notification.type) {
      case "Platform update":
        alert(notification.releaseNumber);
        break;
      case "Comment Tag":
        router.push("/comments");
        break;
      case "Access granted":
        router.push("/chats");
        break;
      case "Join workspace":
        router.push("/workspace");
        break;
    }
  };

  const getBackgroundColor = () => {
    switch (notification.type) {
      case "Platform update":
        return "bg-blue-100";
      case "Comment Tag":
        return "bg-green-100";
      case "Access granted":
        return "bg-yellow-100";
      case "Join workspace":
        return "bg-purple-100";
      default:
        return "bg-gray-100";
    }
  };

  const getIcon = () => {
    if (notification.type === "Platform update") {
      return <SystemIcon />;
    } else {
      return <Avatar name={notification.userName || "User"} />;
    }
  };

  return (
    <div
      className={`p-2 rounded-lg text-black cursor-pointer ${getBackgroundColor()} ${
        notification.isRead ? "opacity-50" : ""
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center space-x-3">
        {getIcon()}
        <div>
          <p className="font-semibold">{notification.type}</p>
          <p>{notification.message}</p>
        </div>
      </div>
    </div>
  );
}

function SystemIcon() {
  return (
    <svg
      className="w-10 h-10 text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
      <span className="text-xl font-semibold text-gray-700">
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}
