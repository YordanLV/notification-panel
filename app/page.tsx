import dynamic from "next/dynamic";

const NotificationPanel = dynamic(
  () => import("../components/NotificationPanel"),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <main className="relative min-h-screen p-24 bg-black text-gray-200">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        Notification Panel Demo
      </h1>
      <div className="absolute top-4 right-4">
        <NotificationPanel />
      </div>
      <div className="max-w-2xl mx-auto mt-12 space-y-6">
        <p>
          Welcome to our Notification Panel Demo. This web application showcases
          a dynamic notification system designed to keep users informed about
          various events and updates within a workspace environment.
        </p>
        <p>Our notification system covers four main types of alerts:</p>
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>
            <span className="text-blue-400">Platform Updates</span>: Keep track
            of new features and version releases.
          </li>
          <li>
            <span className="text-green-400">Comment Tags</span>: Stay connected
            with conversations you're mentioned in.
          </li>
          <li>
            <span className="text-yellow-400">Access Grants</span>: Be notified
            when you're given access to new resources.
          </li>
          <li>
            <span className="text-purple-400">Workspace Joins</span>: Know when
            new members join your workspace.
          </li>
        </ul>
        <p>
          To explore the functionality, click on the notification icon in the
          top-right corner. You can view all notifications, mark them as read,
          and navigate to relevant sections of the application based on the
          notification type.
        </p>
        <p>
          This demo showcases real-time updates, interactive UI elements, and
          seamless navigation - key features of a modern, user-centric
          notification system.
        </p>
      </div>
    </main>
  );
}
