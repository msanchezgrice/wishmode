import Link from 'next/link';

export default function WishboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <header className="flex items-center justify-between mb-6">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="size-8 rounded-xl bg-neutral-900" />
          <h1 className="text-xl font-semibold">Wishmode</h1>
        </Link>
        <a
          href="https://github.com/msanchezgrice/wishmode"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-neutral-500 hover:text-neutral-800"
        >
          GitHub
        </a>
      </header>
      {children}
    </div>
  );
}
