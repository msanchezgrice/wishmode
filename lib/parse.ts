import { Idea } from './types';
import { uid } from './utils';

/** Heuristic parser for a simple wishlist text blob.
 * Recognizes section headers and bullets. Assigns priority/horizon.
 */
export function parseWishlist(text: string): Idea[] {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  let context: {priority?: 'now'|'soon'|'someday', horizon?: 'local'|'trip'} = {};
  const ideas: Idea[] = [];

  for (const line of lines) {
    const lower = line.toLowerCase();
    if (lower.includes('things i want to do soon')) {
      context = { priority: 'soon', horizon: 'local' };
      continue;
    }
    if (lower.includes('things middle term')) {
      context = { priority: 'someday', horizon: 'trip' };
      continue;
    }
    if (lower.startsWith('- ') || lower.startsWith('•')) {
      const title = line.replace(/^[-•]\s*/, '');
      const tags: string[] = [];
      if (/camp|hike|canoe|bike|outdoor/i.test(title)) tags.push('outdoors');
      if (/costa rica/i.test(title)) tags.push('beach','trip');
      if (/hill country/i.test(title)) tags.push('hill-country','weekend');
      if (/rocket|star/i.test(title)) tags.push('space','roadtrip');
      const people: string[] = [];
      if (/niko/i.test(title)) people.push('Niko');
      const location_text = /austin/i.test(title) ? 'Austin, TX' : undefined;

      ideas.push({
        id: uid(),
        title,
        notes: '',
        tags,
        priority: context.priority ?? 'soon',
        horizon: context.horizon ?? 'local',
        people,
        location_text
      });
    }
  }
  return ideas;
}