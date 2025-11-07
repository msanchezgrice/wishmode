/**
 * Fetch a relevant image from Unsplash based on search query
 */
export async function getUnsplashImage(query: string): Promise<string> {
  const apiKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!apiKey) {
    // Fallback to placeholder if no API key
    return `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80`;
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${apiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const photo = data.results[0];
      return photo.urls.regular;
    }

    // Fallback to a nice default image
    return `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80`;
  } catch (error) {
    console.error('Error fetching from Unsplash:', error);
    // Fallback to a nice default image
    return `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80`;
  }
}

/**
 * Generate a search query from idea tags, title, and location
 */
export function generateImageQuery(title: string, tags: string[], location?: string): string {
  let query = '';

  // Start with location if available for grounded results
  if (location) {
    query = location + ' ';
  }

  // If we have relevant tags, use them
  if (tags.length > 0) {
    // Prioritize descriptive tags
    const goodTags = tags.filter(t => !['soon', 'now', 'someday'].includes(t));
    if (goodTags.length > 0) {
      query += goodTags.slice(0, 2).join(' ');
      return query + ' landscape nature';
    }
  }

  // Otherwise, extract key words from title
  const words = title.toLowerCase().split(/\s+/);
  const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'with', 'to', 'in', 'at'];
  const keywords = words.filter(w => !stopWords.includes(w) && w.length > 2);

  query += keywords.slice(0, 2).join(' ') || title;
  return query + ' nature outdoor';
}
