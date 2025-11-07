import { NextRequest, NextResponse } from 'next/server';
import { parseWishlistWithLLM } from '@/lib/llm';
import { getUnsplashImage, generateImageQuery } from '@/lib/images';
import { generateGeminiImage, createGeminiPrompt } from '@/lib/gemini';
import { getGooglePlacesImage, generatePlacesQuery } from '@/lib/places';
import { uid } from '@/lib/utils';
import type { Card } from '@/lib/types';

/** API that converts text into ideas + cards with LLM parsing and dual images. */
export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    // Parse wishlist using LLM
    const ideas = await parseWishlistWithLLM(String(text ?? ''));

    // Generate Unsplash, Gemini, and Google Places images for each idea in parallel
    const cardsPromises = ideas.map(async (i) => {
      const imageQuery = generateImageQuery(i.title, i.tags, i.location_text);
      const geminiPrompt = createGeminiPrompt(i);
      const placesQuery = generatePlacesQuery(i.title, i.tags);
      const meta = i.priority === 'now' ? 'This weekend' : i.priority === 'soon' ? 'Soon' : 'Someday';
      const ctas = ['plan', 'map', 'list', 'invite', 'gear'] as Array<'plan'|'map'|'list'|'invite'|'gear'>;

      // Fetch all three image sources in parallel
      const [unsplashUrl, geminiUrl, placesUrl] = await Promise.all([
        getUnsplashImage(imageQuery),
        generateGeminiImage(geminiPrompt),
        getGooglePlacesImage(placesQuery, i.location_text)
      ]);

      // Create 3 cards per idea: Unsplash, Gemini (if available), Google Places (if available)
      const cards: Card[] = [
        {
          id: uid(),
          ideaId: i.id,
          title: i.title,
          imageUrl: unsplashUrl,
          ctas,
          meta
        }
      ];

      if (geminiUrl) {
        cards.push({
          id: uid(),
          ideaId: i.id,
          title: i.title,
          imageUrl: geminiUrl,
          aiImageUrl: geminiUrl, // Flag as AI image
          ctas,
          meta
        });
      }

      if (placesUrl) {
        cards.push({
          id: uid(),
          ideaId: i.id,
          title: i.title,
          imageUrl: placesUrl,
          placesImageUrl: placesUrl, // Flag as Places image
          ctas,
          meta
        });
      }

      return cards;
    });

    const nestedCards = await Promise.all(cardsPromises);
    const cards = nestedCards.flat(); // Flatten to get single array of all cards

    return NextResponse.json({ ideas, cards });
  } catch (error) {
    console.error('Error processing wishlist:', error);
    return NextResponse.json(
      { error: 'Failed to process wishlist. Make sure API keys are configured.' },
      { status: 500 }
    );
  }
}