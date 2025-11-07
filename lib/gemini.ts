import { GoogleGenAI } from '@google/genai';
import type { Idea } from './types';

const genAI = process.env.GOOGLE_GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_API_KEY })
  : null;

/**
 * Generate an AI image using Gemini 2.5 Flash with image generation (Nano Banana)
 */
export async function generateGeminiImage(prompt: string): Promise<string | null> {
  if (!genAI || !process.env.GOOGLE_GEMINI_API_KEY) {
    console.log('Gemini API key not configured, skipping AI image generation');
    return null;
  }

  try {
    // Use Gemini 2.5 Flash Image model
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: prompt,
    });

    // Extract image from response candidates
    if (response.candidates && response.candidates.length > 0) {
      const candidate = response.candidates[0];
      if (candidate.content && candidate.content.parts) {
        for (const part of candidate.content.parts) {
          // Check for inline image data
          if (part.inlineData) {
            const imageData = part.inlineData.data;
            const mimeType = part.inlineData.mimeType || 'image/png';
            console.log('✓ Gemini image generated successfully');
            // Return as data URL for Next.js Image component
            return `data:${mimeType};base64,${imageData}`;
          }
        }
      }
    }

    console.warn('No image data found in Gemini response');
    return null;
  } catch (error) {
    console.error('Error generating image with Gemini:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message, error.stack);
    }
    return null;
  }
}

/**
 * Create an optimized prompt for Gemini image generation from an idea
 */
export function createGeminiPrompt(idea: Idea): string {
  const { title, tags, horizon, location_text } = idea;

  // Patagonia-inspired nature photography aesthetic
  const styleGuides = [
    'epic landscape photography',
    'golden hour lighting',
    'cinematic composition',
    'wide-angle vista',
    'national geographic style',
    'dramatic natural beauty',
    'rich color saturation',
    'professional outdoor photography'
  ];

  const context = horizon === 'trip'
    ? 'adventure travel destination, remote wilderness, exploration'
    : 'outdoor recreation, nature experience, authentic adventure';

  const tagContext = tags.length > 0
    ? tags.filter(t => !['soon', 'now', 'someday'].includes(t)).join(', ')
    : '';

  // Incorporate location if available
  const locationContext = location_text
    ? ` Located in ${location_text}.`
    : '';

  // Construct the prompt with Patagonia aesthetic
  const prompt = `Create an epic, inspiring landscape photograph of: ${title}.${locationContext}
Photography style: ${styleGuides.join(', ')}.
Scene context: ${context}${tagContext ? `, ${tagContext}` : ''}.
Mood: adventurous, aspirational, awe-inspiring, freedom, wild nature.
Lighting: golden hour, dramatic clouds, natural light.
Composition: expansive vista, human scale (small person or tent in vast landscape), leading lines, rule of thirds.
Make it look like it belongs in a Patagonia catalog or National Geographic - authentic outdoor adventure photography.`;

  return prompt;
}
