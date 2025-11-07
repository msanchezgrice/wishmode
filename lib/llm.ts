import Anthropic from '@anthropic-ai/sdk';
import type { Idea } from './types';
import { uid } from './utils';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function parseWishlistWithLLM(text: string): Promise<Idea[]> {
  const prompt = `You are a wishlist parser. Parse the following wishlist text and extract individual ideas/activities.

For each idea, identify:
- title: A clear, concise title for the activity
- tags: Relevant tags (e.g., "outdoors", "beach", "trip", "weekend", "family", "adventure")
- priority: "now" (urgent/this weekend), "soon" (near future), or "someday" (long-term)
- horizon: "local" (nearby/day trip) or "trip" (requires travel/planning)
- people: Names of people mentioned
- location_text: **IMPORTANT** Extract or infer a specific, searchable location name. Be creative and intelligent:
  * If a place is explicitly mentioned (e.g., "Austin", "Hill Country", "Costa Rica"), use it
  * If the activity implies a location (e.g., "beach" → infer nearby coastal areas, "camping" → infer nearby parks/wilderness)
  * For famous locations or attractions (e.g., "Space Center", "Rocket Park"), include the city/state
  * Make location names detailed and specific (e.g., "Austin, Texas" not just "Austin", "Texas Hill Country" not just "Hill Country")
  * For activities without obvious locations, leave empty but try hard to infer from context
  * Think about what would help find real photos of the place

Return ONLY a valid JSON array of objects. No markdown, no code blocks, just the JSON array.

Example format:
[
  {
    "title": "Camping with Niko",
    "tags": ["outdoors", "camping", "family"],
    "priority": "soon",
    "horizon": "local",
    "people": ["Niko"],
    "location_text": "Texas Hill Country"
  },
  {
    "title": "Visit the Space Center",
    "tags": ["space", "educational", "family"],
    "priority": "soon",
    "horizon": "local",
    "people": [],
    "location_text": "Space Center Houston, Texas"
  },
  {
    "title": "Beach vacation",
    "tags": ["beach", "relaxation", "trip"],
    "priority": "someday",
    "horizon": "trip",
    "people": [],
    "location_text": "Costa Rica beaches"
  }
]

Wishlist text:
${text}`;

  const message = await client.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 2000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from LLM');
  }

  // Parse the JSON response, stripping markdown code blocks if present
  let jsonText = content.text.trim();
  // Remove markdown code block formatting (```json ... ``` or ``` ... ```)
  if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/^```(?:json)?\s*\n/, '').replace(/\n```\s*$/, '');
  }
  const parsed = JSON.parse(jsonText);

  // Add IDs and ensure proper typing
  return parsed.map((idea: any) => ({
    id: uid(),
    title: idea.title,
    notes: idea.notes || '',
    tags: idea.tags || [],
    priority: idea.priority || 'soon',
    horizon: idea.horizon || 'local',
    people: idea.people || [],
    location_text: idea.location_text || undefined,
  }));
}
