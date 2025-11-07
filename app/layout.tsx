import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishboard Starter",
  description: "Paste → Parse → Cards",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <header className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-xl bg-neutral-900" />
              <h1 className="text-xl font-semibold">Wishboard</h1>
            </div>
            <a href="https://github.com" className="text-sm text-neutral-500 hover:text-neutral-800">GitHub</a>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}