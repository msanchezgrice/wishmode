import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishmode - Turn Your Ideas Into Action",
  description: "Stop thinking about it. Start doing it. Transform your bucket list into a visual board and turn ideas into memories.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}