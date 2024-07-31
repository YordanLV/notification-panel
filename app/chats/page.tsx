import dynamic from "next/dynamic";

const NotificationPanel = dynamic(
  () => import("../../components/NotificationPanel"),
  {
    ssr: false,
  }
);

export default function ChatsPage() {
  return (
    <main className="relative min-h-screen p-24">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Notification Panel Demo / Chat
      </h1>
      <div className="absolute top-4 right-4">
        <NotificationPanel />
      </div>
    </main>
  );
}
