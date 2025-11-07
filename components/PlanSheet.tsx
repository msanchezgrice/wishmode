'use client';
import React from 'react';
import { Card as TCard } from '@/lib/types';

export default function PlanSheet({ card, onClose }: { card: TCard | null; onClose: () => void }) {
  if (!card) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-4 md:p-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <button className="btn" onClick={onClose}>Close</button>
          </div>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-neutral-600">Quick checklist</div>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
                <li>Pick date</li>
                <li>Check weather</li>
                <li>Invite family</li>
                <li>Pack essentials</li>
              </ul>
            </div>
            <div>
              <div className="text-sm text-neutral-600">Actions</div>
              <div className="mt-2 flex flex-wrap gap-2">
                <button className="btn">Map</button>
                <button className="btn">Calendar</button>
                <button className="btn">Gear</button>
                <button className="btn btn-primary">Plan it</button>
              </div>
            </div>
          </div>
          <div className="mt-4 text-xs text-neutral-500">Future: tie into Google Calendar, Maps, weather, and household invites.</div>
        </div>
      </div>
    </div>
  );
}