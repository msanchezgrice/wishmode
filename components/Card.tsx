'use client';
import Image from 'next/image';
import { Card as TCard } from '@/lib/types';

export default function Card({ card, onOpen }: { card: TCard; onOpen: (card: TCard) => void }) {
  const isAiImage = !!(card.aiImageUrl && card.imageUrl === card.aiImageUrl);
  const isPlacesImage = !!(card.placesImageUrl && card.imageUrl === card.placesImageUrl);

  return (
    <div className="card overflow-hidden">
      <button className="block w-full text-left" onClick={() => onOpen(card)}>
        <div className="relative w-full h-56">
          <Image
            src={card.imageUrl}
            alt={card.title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 33vw"
            unoptimized={isAiImage || isPlacesImage} // Don't optimize base64/AI or external API images
          />
          {isAiImage && (
            <div className="absolute top-2 right-2 text-xs px-2 py-1 rounded-full bg-purple-600/80 text-white backdrop-blur-sm">
              AI
            </div>
          )}
          {isPlacesImage && (
            <div className="absolute top-2 right-2 text-xs px-2 py-1 rounded-full bg-blue-600/80 text-white backdrop-blur-sm">
              Real
            </div>
          )}
        </div>
        <div className="p-3">
          <div className="font-medium leading-tight">{card.title}</div>
          {card.meta && <div className="text-xs text-neutral-500 mt-1">{card.meta}</div>}
          <div className="flex gap-2 mt-3">
            {card.ctas.map(c => (
              <span key={c} className="text-xs px-2 py-1 rounded-full bg-neutral-100 border border-neutral-200">{c}</span>
            ))}
          </div>
        </div>
      </button>
    </div>
  );
}