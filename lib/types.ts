export type Priority = 'now' | 'soon' | 'someday';
export type Horizon = 'local' | 'trip';

export interface Idea {
  id: string;
  title: string;
  notes?: string;
  tags: string[];
  priority: Priority;
  horizon: Horizon;
  people: string[];
  location_text?: string;
}

export interface Card {
  id: string;
  ideaId: string;
  title: string;
  imageUrl: string;
  aiImageUrl?: string | null;
  placesImageUrl?: string | null;
  ctas: Array<'plan'|'map'|'list'|'invite'|'gear'>;
  meta?: string;
}