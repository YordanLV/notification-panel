import dynamic from "next/dynamic";

const NotificationPanel = dynamic(
  () => import("../components/NotificationPanel"),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Notification Panel Demo</h1>
      <NotificationPanel />
    </main>
  );
}
