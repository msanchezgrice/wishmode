'use client';
import React, { useState } from 'react';
import PasteBar from '@/components/PasteBar';
import MasonryGrid from '@/components/MasonryGrid';
import Card from '@/components/Card';
import PlanSheet from '@/components/PlanSheet';
import type { Card as TCard } from '@/lib/types';

export default function Page() {
  const [cards, setCards] = useState<TCard[]>([]);
  const [active, setActive] = useState<TCard | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (text: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate board');
      }

      setCards(data.cards || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="text-sm text-neutral-600">Turn your wishlist into a visual board.</div>
        <div className="ml-auto flex gap-2">
          <button className="btn">This weekend</button>
          <button className="btn">Soon</button>
          <button className="btn">Someday</button>
        </div>
      </div>
      <PasteBar onSubmit={handleGenerate} />

      {error && (
        <div className="card p-4 mb-4 bg-red-50 border-red-200">
          <div className="text-red-800 font-medium">Error</div>
          <div className="text-red-600 text-sm mt-1">{error}</div>
        </div>
      )}

      {loading && (
        <div className="card p-8 mb-4 text-center">
          <div className="text-neutral-600">Generating your wishboard...</div>
        </div>
      )}

      <MasonryGrid>
        {cards.map((c) => (
          <Card key={c.id} card={c} onOpen={setActive} />
        ))}
      </MasonryGrid>
      <PlanSheet card={active} onClose={() => setActive(null)} />
    </main>
  );
}