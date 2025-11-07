import React from 'react';

export default function MasonryGrid({ children }: { children: React.ReactNode }) {
  return <div className="masonry">{children}</div>;
}