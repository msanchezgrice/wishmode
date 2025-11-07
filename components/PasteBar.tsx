'use client';
import React, { useState } from 'react';

export default function PasteBar({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [text, setText] = useState('');
  return (
    <div className="card p-3 md:p-4 mb-4">
      <label className="block text-sm font-medium mb-2">Paste your wishlist</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        className="w-full rounded-xl border border-neutral-300 p-3 focus:outline-none focus:ring-2 focus:ring-neutral-300"
        placeholder="- camping with Niko
- more hiking / outdoors
- more canoeing
- teach Niko to bike
- Costa Rica
- Hill Country
- Rocket launch at Starbase"
      />
      <div className="mt-3 flex gap-2">
        <button className="btn btn-primary" onClick={() => onSubmit(text)}>Generate board</button>
        <button className="btn" onClick={() => setText('')}>Clear</button>
      </div>
    </div>
  );
}