import "./globals.css";
import { NotificationProvider } from "../context/NotificationContext";

export const metadata = {
  title: "Notification Panel",
  description: "A demo of a notification panel using Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NotificationProvider>{children}</NotificationProvider>
      </body>
    </html>
  );
}
